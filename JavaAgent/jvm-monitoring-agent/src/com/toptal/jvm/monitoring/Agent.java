/**
 *  Copyright 2017 Michal Papis <mpapis@gmail.com>
 *  Copyright 2019 Alexey Shein <alexey.shein@toptal.com>
 *
 *  This file is part of JVM Monitoring Agent.
 *
 *  JVM Monitoring Agent is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  JVM Monitoring Agent is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with JVM Monitoring Agent.  If not, see <http://www.gnu.org/licenses/>.
 */

package com.toptal.jvm.monitoring;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintStream;
import java.lang.instrument.ClassFileTransformer;
import java.lang.instrument.IllegalClassFormatException;
import java.lang.instrument.Instrumentation;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.ProtectionDomain;
import java.util.Map;
import java.util.Properties;
import java.util.Set;
import java.util.Timer;
import java.util.TimerTask;
import java.util.WeakHashMap;
import java.util.concurrent.Future;
import java.util.regex.Pattern;
import java.util.jar.JarFile;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;

/**
 *
 * @author mpapis
 */
public final class Agent extends TimerTask {

	// configuration & defaults
	private boolean debug = false; // turn on debugging
	private String root_path = "tmp"; // where to save dumps
	private int interval = 1000; // interval between checks in milliseconds
	private int threshold = 60000; // how long thread needs to be blocked to save the dump in milliseconds
	private int saveDelay = 60000; // how long to wait between saving next dump in milliseconds

	// internal
	private static final String NAME = "JVM Monitoring Agent";
	private final Timer timer = new Timer(NAME, true);
	private final WeakHashMap<Thread, Long> blockedThreads = new WeakHashMap<>();
	private long lastSave = 0;
	private long loopStartTime = 0;
	private String dumpFileName = "";
	private boolean blockedToLong = false;
	private String filterRegexStr = null;
	private Pattern filterPattern = null;
	


	public static void premain(String stringArgs, Instrumentation inst) throws InterruptedException, IOException {
		inst.appendToSystemClassLoaderSearch(new JarFile("lib/kafka-clients-2.3.0.jar"));
		inst.appendToSystemClassLoaderSearch(new JarFile("lib/slf4j-api-1.7.26.jar"));
		inst.addTransformer(new ClassFileTransformer() {
			@Override
			public byte[] transform(ClassLoader loader, String className, Class<?> classBeingRedefined,
					ProtectionDomain protectionDomain, byte[] classfileBuffer) throws IllegalClassFormatException {
				// TODO Auto-generated method stub
				return null;
			}
		}, true);
		Agent agent = new Agent(stringArgs);
		agent.start();
	}

	public Agent(String stringArgs) {
		parseArgs(stringArgs);
		createRootPath();
	}

	private void parseArgs(String stringArgs) {
		String[] args = stringArgs == null ? new String[0] : stringArgs.split(",");
		for (String arg : args) {
			String[] key_value = arg.split("=", 2);
			switch (key_value[0]) {
			case "":
				break; // in case of no args just skip
			case "debug":
				debug = true;
				break;
			case "path":
				root_path = key_value[1];
				break;
			case "interval":
				interval = Integer.parseInt(key_value[1]);
				break;
			case "threshold":
				threshold = Integer.parseInt(key_value[1]);
				break;
			case "delay":
				saveDelay = Integer.parseInt(key_value[1]);
				break;
			case "filterRegex":
				filterRegexStr = key_value[1];
				break;
			default:
				log("Unknown argument:" + arg);
				break;
			}
		}
		log(String.format("Initiated with:%n  root: '%s'%n  interval: %d%n  treshold: %d%n", root_path, interval,
				threshold));
	}

	private void createRootPath() {
		try {
			Files.createDirectories(Paths.get(root_path));
		} catch (IOException ex) {
			log(ex.toString());
		}
	}

	public void start() {
		if (filterRegexStr != null && !filterRegexStr.trim().isEmpty()) {
			try {
				filterPattern = Pattern.compile(filterRegexStr);
				log(String.format("Filter Pattern '%s' is active", filterPattern));
			} catch (Exception e) {
				log("Filter pattern is invalid: " + e.getMessage());
			}
		}

		run();
		timer.schedule(this, interval, interval);
	}

	@Override
	public void run() {
		loopStartTime = System.currentTimeMillis();
		boolean savedDump = checkThreads();
		long endTime = System.currentTimeMillis();
		long timeDiff = (endTime - loopStartTime);

		String msg = "-" + loopStartTime + "- It took " + timeDiff + "ms";
		if (blockedToLong)
			msg += " - threads are blocked";
		if (savedDump) {
			lastSave = loopStartTime;
			msg += " - saved dump: " + dumpFileName;
		}
		if (blockedToLong || savedDump) {
			log(msg);
		}
	}

	private void log(String msg) {
		if (debug)
			System.err.println("[" + NAME + "] " + msg);
	}

	private boolean checkThreads() {
		Map<Thread, StackTraceElement[]> threads = Thread.getAllStackTraces();

		cleanUnBlockedThreads();
		addBlockedThreads(threads.keySet());
		checkBlockedToLong();

		return blockedToLong && shouldBeSaved() && saveThreadsDump(threads);
	}

	private void cleanUnBlockedThreads() {
		blockedThreads.keySet().removeIf(thread -> (thread.getState() != Thread.State.BLOCKED));
	}

	private void addBlockedThreads(Set<Thread> threads) {
		threads.stream()
				.filter(thread -> (thread.getState() == Thread.State.BLOCKED)
						&& (filterPattern == null || filterPattern.matcher(thread.getName()).matches()))
				.forEach(thread -> blockedThreads.putIfAbsent(thread, loopStartTime));
	}

	private void checkBlockedToLong() {
		long now = System.currentTimeMillis();
		blockedToLong = blockedThreads.values().stream().anyMatch(date -> (now - date > threshold));
	}

	private boolean shouldBeSaved() {
		return lastSave + saveDelay <= loopStartTime;
	}

	private void sendThreadDumps() {
		Properties configs = new Properties();
		try {
			configs.put("client.id", InetAddress.getLocalHost().getHostName());
		} catch (UnknownHostException e) {
			throw new RuntimeException(e);
		}
		// 카프카 브로커의 주소 목록은 2개 이상의 ip 와 port 를 설정하도록 권장하고 있다.
		configs.put("bootstrap.servers", "localhost:9092");
		// 나머지 key, value 에 대해 직렬화 설정
		configs.put("key.serializer", "org.apache.kafka.common.serialization.StringSerializer");
		configs.put("value.serializer", "org.apache.kafka.common.serialization.StringSerializer");
		// 카프카 프로듀서 인스터스 생성
		KafkaProducer<String, String> producer = new KafkaProducer<String, String>(configs);
		// 카프카가 제공하는 전송 객체 사용
		// final ProducerRecord<K, V> record = new ProducerRecord<>(topic, key, value);
		// final ProducerRecord<K, V> record = new ProducerRecord<>(topic, value);
		ProducerRecord<String, String> record = new ProducerRecord<String, String>("oingdaddy", "Hello");
		// send() API returns a future which can polled to get result of send()
		Future<RecordMetadata> future = producer.send(record);
		producer.close();
	}

	private void printThreadsDump(PrintStream stream, Map<Thread, StackTraceElement[]> threads) {
		sendThreadDumps();
//        stream.format(
//            "#Threads: %d, #Blocked: %d%n%n",
//            threads.size(),
//            blockedThreads.size()
//        );
//        threads.forEach((thread, stack) -> {
//            stream.format(
//                "Thread:%d '%s' %sprio=%d %s%n",
//                thread.getId(),
//                thread.getName(),
//                thread.isDaemon() ? "daemon " : "",
//                thread.getPriority(),
//                thread.getState()
//            );
//            for (StackTraceElement line: stack)
//                stream.println("        " + line);
//            stream.println();
//        });
	}

	private boolean saveThreadsDump(Map<Thread, StackTraceElement[]> threads) {
		dumpFileName = root_path + "/threads_dump_" + loopStartTime + ".txt";

		try (PrintStream stream = new PrintStream(dumpFileName)) {
			printThreadsDump(stream, threads);
			return true;
		} catch (FileNotFoundException ex) {
			log(ex.toString());
			return false;
		}
	}
}

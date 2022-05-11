package com.ssafy;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;

import java.lang.management.*;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.Future;

public final class Agent extends TimerTask{

    // configuration & defaults
    private boolean debug     = false; //turn on debugging
    private String  log_topic = "logs"; //where to save dumps
    private int     interval  = 10000;  //interval between checks in milliseconds

    // internal
    private static final String             NAME           = "JVM Monitoring Agent";
    private final Timer                     timer          = new Timer(NAME, true);
//    private final WeakHashMap<Thread, Long> blockedThreads = new WeakHashMap<>();

    public static void premain(String stringArgs) throws InterruptedException {
        Agent agent = new Agent(stringArgs);
        agent.start();
    }

    public Agent(String stringArgs) {
        parseArgs(stringArgs);
    }

    private void parseArgs(String stringArgs) {
        String[] args = stringArgs == null ? new String[0] : stringArgs.split(",");
        for (String arg: args)
        {
            String[] key_value = arg.split("=", 2);
            switch (key_value[0]) {
                case "":            break; // in case of no args just skip
                case "debug":       debug           = true;                           break;
                case "topic":       log_topic       = key_value[1];                   break;
                case "interval":    interval        = Integer.parseInt(key_value[1]); break;
                default:
                    log("Unknown argument:" + arg);
                    break;
            }
        }
        log(String.format(
                "Initiated with:%n  Kafka Topic: '%s'%n  interval: %d%n",
                log_topic,
                interval ));
    }

    public void start() {
        run();
        timer.schedule(this, interval, interval);
    }

    @Override
    public void run() {
        long loopStartTime = System.currentTimeMillis();
        printThreadsDump();
        long endTime      = System.currentTimeMillis();
        long timeDiff     = (endTime - loopStartTime);

        String msg = "-" + loopStartTime + "- It took " + timeDiff + "ms";
        log(msg);
    }

    private void log(String msg) {
        if (debug)
            System.err.println("[" + NAME + "] " + msg);
    }

    private void sendThreadsDump(String payload) {
        Properties configs = new Properties();
        try {
            configs.put("client.id", InetAddress.getLocalHost().getHostName());
        } catch (UnknownHostException e) {
            throw new RuntimeException(e);
        }
        // It is recommended to set 2 or more IP and port for Kafka Broker
        configs.put("bootstrap.servers", "localhost:9092");
        // Serialize key, value
        configs.put("key.serializer",
                "org.apache.kafka.common.serialization.StringSerializer");
        configs.put("value.serializer",
                "org.apache.kafka.common.serialization.StringSerializer");
        // Create Kafka Producer Instance
        KafkaProducer< String, String > producer = new KafkaProducer < String,
                String >(configs);
        // Use ProducerRecord provided by Kafka
        // final ProducerRecord<K, V> record = new ProducerRecord<>(topic, key, value);
        // final ProducerRecord<K, V> record = new ProducerRecord<>(topic, value);
        ProducerRecord<String, String> record = new ProducerRecord < String, String >
                (log_topic, payload);
        // send() API returns a future which can polled to get result of send()
        Future<RecordMetadata> future = producer.send(record);
        producer.close();
    }

    private void printThreadsDump() {
        ThreadMXBean mxBean = ManagementFactory.getThreadMXBean();
        Map<Thread, StackTraceElement[]> threads = Thread.getAllStackTraces();

        InetAddress hostInfo;
        String hostName;
        String hostIp;
        try {
            hostInfo = InetAddress.getLocalHost();
            hostName = hostInfo.getHostName();
            hostIp = hostInfo.getHostAddress();
        } catch (UnknownHostException e) {
            throw new RuntimeException(e);
        }

        final StringBuilder message = new StringBuilder();

        message.append(hostName);
        message.append("\n");
        message.append(hostIp);
        message.append("\n");

        message.append(ManagementFactory.getRuntimeMXBean().getName());
        message.append("\n");

        LocalDateTime logNowTime = LocalDateTime.now();
        message.append(logNowTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
        message.append("\n");

        message.append(String.format("Full thread dump %s (%s %s):\n\n",
                System.getProperty("java.vm.name"),
                System.getProperty("java.vm.version"),
                System.getProperty("java.vm.info")
        ));

        message.append("Thread info:\n");
        message.append(String.format("Thread count: %d, elements={",
                mxBean.getThreadCount()
        ));
        for(Thread thread : threads.keySet()) {
            message.append(String.format("0x%016x, ", thread.hashCode()));
        }
        message.append("\n}\n\n");

        try {
            for(Thread thread : threads.keySet()) {
//                StackTraceElement[] stackTrace = threads.get(thread);
                long[] ids = { thread.getId() };
                ThreadInfo[] threadInfo = mxBean.getThreadInfo(ids, true, true);
                MonitorInfo[] monitorInfo = threadInfo[0].getLockedMonitors();
                LockInfo lockInfo = threadInfo[0].getLockInfo();

                message.append(String.format("\"%s\" #%d %sprio=%d tid=0x%016x\n   java.lang.Thread.State: %s\n",
                        thread.getName(),
                        thread.getId(),
                        thread.isDaemon() ? "daemon " : "",
                        thread.getPriority(),
                        thread.hashCode(),
                        thread.getState()
                ));

                int stackDepth = 0;
                for(StackTraceElement stackTraceElement : thread.getStackTrace()) {
                    message.append("        at ").append(stackTraceElement.getClassName());
                    message.append(".").append(stackTraceElement.getMethodName());
                    if(stackTraceElement.isNativeMethod()) {
                        message.append("(Native Method)\n");
                    } else {
                        message.append("(").append(stackTraceElement.getFileName()).append(":").append(stackTraceElement.getLineNumber()).append(")\n");
                    }

                    String stackTraceElementMethodName = stackTraceElement.getMethodName();
                    if(stackDepth == 0 && lockInfo != null) {
                        if(stackTraceElementMethodName.equals("park")) {
                            message.append(String.format("        - parking to wait for <0x%016x> (a %s)\n",
                                    lockInfo.getIdentityHashCode(),
                                    lockInfo.getClassName()
                            ));
                        } else {
                            message.append(String.format("        - waiting to lock <0x%016x> (a %s)\n",
                                    lockInfo.getIdentityHashCode(),
                                    lockInfo.getClassName()
                            ));
                        }
                    }

                    for(MonitorInfo monitorInfoEach : monitorInfo) {
                        if(stackDepth == monitorInfoEach.getLockedStackDepth()) {
                            if(stackTraceElementMethodName.equals("wait")) {
                                message.append(String.format("        - waiting on <0x%016x> (a %s)\n",
                                        monitorInfoEach.getIdentityHashCode(),
                                        monitorInfoEach.getClassName()
                                ));
                            } else if(stackTraceElementMethodName.equals("park")) {
                                message.append(String.format("        - parking to wait for <0x%016x> (a %s)\n",
                                        monitorInfoEach.getIdentityHashCode(),
                                        monitorInfoEach.getClassName()
                                ));
                            } else {
                                message.append(String.format("        - locked <0x%016x> (a %s)\n",
                                        monitorInfoEach.getIdentityHashCode(),
                                        monitorInfoEach.getClassName()
                                ));
                            }
                        }
                    }
                    stackDepth += 1;
                }

                LockInfo[] synchronizersInfo = threadInfo[0].getLockedSynchronizers();
                message.append("\n   Locked ownable synchronizers:\n");
                boolean flag = true;
                for(LockInfo synchronizerInfoEach : synchronizersInfo) {
                    message.append(String.format("        - <0x%016x> (a %s)\n",
                            synchronizerInfoEach.getIdentityHashCode(),
                            synchronizerInfoEach.getClassName()
                    ));
                    flag = false;
                }
                if(flag) {
                    message.append("        - None\n");
                }

                message.append("\n\n");
            }
        } catch (NullPointerException e) {
            System.out.println(e.toString());
        }
        sendThreadsDump(message.toString());
    }
}

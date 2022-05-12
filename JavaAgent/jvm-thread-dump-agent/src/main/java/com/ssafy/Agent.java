package com.ssafy;

import org.apache.kafka.clients.producer.KafkaProducer;
import org.apache.kafka.clients.producer.ProducerRecord;
import org.apache.kafka.clients.producer.RecordMetadata;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

import java.lang.management.*;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.Future;

public final class Agent extends TimerTask{

    // configuration & defaults
    private boolean   debug         = false;  //turn on debugging

    private String    clusterName   = null;   // cluster_id
    private String    hostName      = null;   // host name
    private String[]  tags;                   // tag names
    private String    log_topic     = "logs"; //where to save dumps
    private int       interval      = 10000;  //interval between checks in milliseconds

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

    private  String[] parseTags(String stringTags) {
        return stringTags == null ? new String[0] : stringTags.split("/");
    }
    private void parseArgs(String stringArgs) {
        String[] args = stringArgs == null ? new String[0] : stringArgs.split(",");
        for (String arg: args)
        {
            String[] key_value = arg.split("=", 2);
            switch (key_value[0]) {
                case "":            break; // in case of no args just skip
                case "debug":       debug           = true;                           break;
                case "cluster":     clusterName     = key_value[1];                   break;
                case "host":        hostName        = key_value[1];                   break;
                case "tags":        tags            = parseTags(key_value[1]);        break;
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
        configs.put("bootstrap.servers", "k6s102.p.ssafy.io:8092");
        // Serialize key, value
        configs.put("key.serializer",
                "org.apache.kafka.common.serialization.StringSerializer");
        configs.put("value.serializer",
                "org.apache.kafka.common.serialization.StringSerializer");
        // Create Kafka Producer Instance
        KafkaProducer< String, String > producer = new KafkaProducer<>(configs);
        // Use ProducerRecord provided by Kafka
        // final ProducerRecord<K, V> record = new ProducerRecord<>(topic, key, value);
        // final ProducerRecord<K, V> record = new ProducerRecord<>(topic, value);
        ProducerRecord< String, String > record = new ProducerRecord< String, String >
                (log_topic, payload);
        // send() API returns a future which can polled to get result of send()
        Future<RecordMetadata> future = producer.send(record);
        producer.close();
    }


    @SuppressWarnings("unchecked")
    private void printThreadsDump() {
        ThreadMXBean mxBean = ManagementFactory.getThreadMXBean();
        Map<Thread, StackTraceElement[]> threads = Thread.getAllStackTraces();

//        InetAddress hostInfo;
//        String hostName;
//        String hostIp;
//        try {
//            hostInfo = InetAddress.getLocalHost();
//            hostName = hostInfo.getHostName();
//            hostIp = hostInfo.getHostAddress();
//        } catch (UnknownHostException e) {
//            throw new RuntimeException(e);
//        }

        // create message (JSON Object)
        JSONObject message = new JSONObject();
        message.put("cluster", clusterName);
        message.put("host", hostName);

        JSONArray jsonArrayTags= new JSONArray();
        Collections.addAll(jsonArrayTags, tags); //  copy tags to jsonArrayTags
        message.put("tags", jsonArrayTags);
        System.out.println(message.toJSONString());
//        message.put("hostName", hostName);
//        message.put("hostIp", hostIp);
//        message.put("processId", ManagementFactory.getRuntimeMXBean().getName());

        LocalDateTime logNowTime = LocalDateTime.now();
        message.put("logTime", logNowTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));

        message.put("vmInfo", String.format("%s (%s %s):",
                System.getProperty("java.vm.name"),
                System.getProperty("java.vm.version"),
                System.getProperty("java.vm.info")
        ));

        message.put("threadCount", String.format("%d", mxBean.getThreadCount()));
        JSONArray threadElements = new JSONArray();
        for(Thread thread : threads.keySet()) {
            threadElements.add(String.format("0x%016x", thread.hashCode()));
        }
        message.put("threadElements", threadElements);

        // create threadDumps (array)
        JSONArray threadDumps = new JSONArray();
        try {
            for(Thread thread : threads.keySet()) {
//                StackTraceElement[] stackTrace = threads.get(thread);
                long[] ids = { thread.getId() };
                ThreadInfo[] threadInfo = mxBean.getThreadInfo(ids, true, true);
                MonitorInfo[] monitorInfo = threadInfo[0].getLockedMonitors();
                LockInfo lockInfo = threadInfo[0].getLockInfo();
                long lockOwnerId = threadInfo[0].getLockOwnerId();
                String lockOwnerName = threadInfo[0].getLockOwnerName();

                // create threadDump Element
                JSONObject threadDump = new JSONObject();
                threadDump.put("id", thread.getId());
                threadDump.put("hashId", thread.hashCode());
                threadDump.put("name", thread.getName());
                threadDump.put("isDaemon", thread.isDaemon() ? "true" : "false");
                threadDump.put("priority", thread.getPriority());
                threadDump.put("state", thread.getState().toString());
                if (lockOwnerId != -1) {
                    threadDump.put("lockOwner", lockOwnerId + "@" + lockOwnerName);
                } else {
                    threadDump.put("lockOwner", "null");
                }

                // create stackTraces (array)
                JSONArray stackTraces = new JSONArray();
                int stackDepth = 0;
                for(StackTraceElement stackTraceElement : thread.getStackTrace()) {

                    // create stackTrace element (string)
                    StringBuilder stackTrace = new StringBuilder();
                    stackTrace.append("at ").append(stackTraceElement.getClassName());
                    stackTrace.append(".").append(stackTraceElement.getMethodName());
                    if(stackTraceElement.isNativeMethod()) {
                        stackTrace.append("(Native Method)\n");
                    } else {
                        stackTrace.append("(").append(stackTraceElement.getFileName()).append(":").append(stackTraceElement.getLineNumber()).append(")\n");
                    }

                    String stackTraceElementMethodName = stackTraceElement.getMethodName();
                    if(stackDepth == 0 && lockInfo != null) {
                        if(stackTraceElementMethodName.equals("park")) {
                            stackTrace.append(String.format("- parking to wait for <0x%016x> (a %s)\n",
                                    lockInfo.getIdentityHashCode(),
                                    lockInfo.getClassName()
                            ));
                        } else {
                            stackTrace.append(String.format("- waiting to lock <0x%016x> (a %s)\n",
                                    lockInfo.getIdentityHashCode(),
                                    lockInfo.getClassName()
                            ));
                        }
                    }

                    for(MonitorInfo monitorInfoEach : monitorInfo) {
                        if(stackDepth == monitorInfoEach.getLockedStackDepth()) {
                            if(stackTraceElementMethodName.equals("wait")) {
                                stackTrace.append(String.format("- waiting on <0x%016x> (a %s)\n",
                                        monitorInfoEach.getIdentityHashCode(),
                                        monitorInfoEach.getClassName()
                                ));
                            } else if(stackTraceElementMethodName.equals("park")) {
                                stackTrace.append(String.format("- parking to wait for <0x%016x> (a %s)\n",
                                        monitorInfoEach.getIdentityHashCode(),
                                        monitorInfoEach.getClassName()
                                ));
                            } else {
                                stackTrace.append(String.format("- locked <0x%016x> (a %s)\n",
                                        monitorInfoEach.getIdentityHashCode(),
                                        monitorInfoEach.getClassName()
                                ));
                            }
                        }
                    }
                    stackDepth += 1;
                    stackTraces.add(stackTrace.toString());
                }
                threadDump.put("stackTrace", stackTraces);

                // create lockedOwnableSynchronizers (array)
                JSONArray lockedOwnableSynchronizers = new JSONArray();
                LockInfo[] synchronizersInfo = threadInfo[0].getLockedSynchronizers();
                boolean flag = true;
                for(LockInfo synchronizerInfoEach : synchronizersInfo) {
                    lockedOwnableSynchronizers.add(String.format("- <0x%016x> (a %s)",
                            synchronizerInfoEach.getIdentityHashCode(),
                            synchronizerInfoEach.getClassName()
                    ));
//                    flag = false;
                }
//                if(flag) {
//                    lockedOwnableSynchronizers.add("- None");
//                }
                threadDump.put("lockedOwnableSynchronizers", lockedOwnableSynchronizers);

                // add threadDump (JSON object) into threadDumps (array)
                threadDumps.add(threadDump);
            }
        } catch (NullPointerException e) {
            System.out.println(e.toString());
        }

        // add threadDumps (array) to message (JSON Object)
        message.put("threadDumps", threadDumps);

        sendThreadsDump(message.toString());
    }
}

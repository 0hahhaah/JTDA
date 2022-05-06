package com.example.kafkaconsumermongodb.service;

import com.example.kafkaconsumermongodb.threadlog.ThreadDump;
import com.example.kafkaconsumermongodb.threadlog.ThreadLog;
import com.example.kafkaconsumermongodb.threadlog.ThreadStateCount;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import javax.validation.Valid;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class KafkaSampleConsumerService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @KafkaListener(topics = "json_log", groupId = "test-log")
    public void consume(String message) throws IOException {
//        System.out.println("receive message : " + message);

        ThreadLog threadLog = new Gson().fromJson(message, ThreadLog.class);
        threadLog.setThreadStateCount(threadStateCounting(threadLog.getThreadDumps()));
//        mongoTemplate.insert(threadLog);
        mongoInsert(threadLog);
        SimpleDateFormat format1 = new SimpleDateFormat ( "yyyy-MM-dd HH:mm:ss");
        Date time = new Date();


        System.out.println("thread insert time : "+ format1.format(time));
    }

    public void mongoInsert(@Valid ThreadLog threadLog) {
        mongoTemplate.insert(threadLog);
        return;
    }


    public ThreadStateCount threadStateCounting(ThreadDump[] threadDumps) {

        ThreadStateCount threadStateCount = new ThreadStateCount();


        for(ThreadDump threadDump : threadDumps) {
            switch (threadDump.getState()) {
                case "RUNNABLE" :
                    threadStateCount.setRUNNABLE(threadStateCount.getRUNNABLE()+1);
                    break;
                case "BLOCKED" :
                    threadStateCount.setBLOCKED(threadStateCount.getBLOCKED()+1);
                    break;
                case "WAITING" :
                    threadStateCount.setWAITING(threadStateCount.getWAITING()+1);
                    break;
                case "TIMED_WAITING" :
                    threadStateCount.setTIMED_WAITING(threadStateCount.getTIMED_WAITING()+1);
                    break;
            }
        }


        return threadStateCount;
    }
}


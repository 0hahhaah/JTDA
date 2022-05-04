package com.example.kafkaconsumermongodb.service;

import com.example.kafkaconsumermongodb.threadlog.ThreadLog;
import com.google.gson.Gson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class KafkaSampleConsumerService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @KafkaListener(topics = "json_log", groupId = "test-log")
    public void consume(String message) throws IOException {
//        System.out.println("receive message : " + message);

        ThreadLog threadLog = new Gson().fromJson(message, ThreadLog.class);
//        mongoTemplate.insert(threadLog);
        mongoInsert(threadLog);
        System.out.println("thread insert");
    }

    public void mongoInsert(@Valid ThreadLog threadLog) {
        mongoTemplate.insert(threadLog);
    }
}


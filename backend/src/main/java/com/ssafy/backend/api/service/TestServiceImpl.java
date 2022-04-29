package com.ssafy.backend.api.service;

import com.ssafy.backend.api.dto.response.TestRes;
import com.ssafy.backend.core.domain.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("TestService")
public class TestServiceImpl implements TestService{

    @Autowired
    MongoTemplate mongoTemplate;

    @Override
    public List<Test> getTestList(){

        Query query = new Query();
        List<Test> testList = mongoTemplate.find(query, Test.class, "logsTest");
        return testList;
    }
}

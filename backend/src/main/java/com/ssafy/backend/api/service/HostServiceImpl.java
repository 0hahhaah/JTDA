package com.ssafy.backend.api.service;

import com.ssafy.backend.core.domain.HostList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("HostListService")
public class HostServiceImpl implements HostService {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public HostServiceImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public List<HostList> getHostList(String startAt, String endAt) {
        BasicQuery query = new BasicQuery("{logTime: { $gte: '"+startAt+"', $lte: '"+endAt+"'}}");
        query.fields().exclude("_id");

        return mongoTemplate.find(query, HostList.class, "json_log");
    }
}

package com.ssafy.backend.api.service;

import com.ssafy.backend.core.domain.HostList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;
import java.util.regex.PatternSyntaxException;

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

    @Override
    public List<HostList> getHostSearch(String query) {
        try {
            query = URLDecoder.decode(query, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        boolean isRegex;
        try {
            Pattern.compile(query);
            isRegex = true;
        } catch (PatternSyntaxException e) {
            isRegex = false;
        }

        if(isRegex && !query.isEmpty()) {
            Query queryRegex = new Query();
            queryRegex.addCriteria(Criteria.where("hostName").regex(query));

            return mongoTemplate.find(queryRegex, HostList.class, "json_log");
        } else {
            return new ArrayList<>();
        }
    }
}

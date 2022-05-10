package com.ssafy.backend.api.service;

import com.ssafy.backend.api.dto.response.ThreadStateDetailDto;
import com.ssafy.backend.core.domain.ThreadDumps;
import com.ssafy.backend.core.domain.ThreadStateDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("ThreadDetailService")
public class ThreadStateDetailServiceImpl implements ThreadStateDetailService{

    private final MongoTemplate mongoTemplate;

    @Autowired
    public ThreadStateDetailServiceImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public ThreadStateDetailDto getThreadStateDetailList(String _id, String state) throws Exception {

        BasicQuery query = new BasicQuery("{_id : ObjectId('"+_id+"')}");
        ThreadStateDetail detail = mongoTemplate.findOne(query, ThreadStateDetail.class, "threaddump");


        return new ThreadStateDetailDto(detail);
    }
}

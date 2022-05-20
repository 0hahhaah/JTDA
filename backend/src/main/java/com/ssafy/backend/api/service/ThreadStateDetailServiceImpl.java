package com.ssafy.backend.api.service;

import com.ssafy.backend.api.dto.response.ThreadStateDetailDto;
import com.ssafy.backend.core.domain.ThreadDumps;
import com.ssafy.backend.core.domain.ThreadStateDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("ThreadDetailService")
public class ThreadStateDetailServiceImpl implements ThreadStateDetailService{

    private final MongoTemplate mongoTemplate;

    @Autowired
    public ThreadStateDetailServiceImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @Override
    public ThreadStateDetailDto getThreadStateDetailList(String _id, String state) throws Exception {

        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(_id));
        ThreadStateDetail detail = mongoTemplate.findOne(query, ThreadStateDetail.class, "threaddump");

        List<ThreadDumps> threadDumps = new ArrayList<ThreadDumps>();

        if (!state.equals("")) {
            int threadSize = detail.getThreadDumps().size();
            for (int i = 0; i < threadSize; i++) {
                if (state.equals(detail.getThreadDumps().get(i).getState())) {
                    threadDumps.add(detail.getThreadDumps().get(i));
                }
            }
            detail.setThreadDumps(threadDumps);
        }


        Collections.sort(detail.getThreadDumps(), new Comparator<ThreadDumps>() {
            @Override
            public int compare(ThreadDumps o1, ThreadDumps o2) {
                return o1.getName().compareTo(o2.getName());
            }
        });
        return new ThreadStateDetailDto(detail);
    }

}

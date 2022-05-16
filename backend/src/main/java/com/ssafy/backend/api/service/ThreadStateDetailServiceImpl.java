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

//        BasicQuery query = new BasicQuery("{_id : ObjectId('"+_id+"')}");
        Query query = new Query();
        query.addCriteria(Criteria.where("_id").is(_id));

//        query.addCriteria(Criteria.where("threadDumps").elemMatch(Criteria.where("state").is(state)));
//        List<Criteria> criteriaList = new ArrayList<>();
//        criteriaList.add(Criteria.where("threadDumps").elemMatch(Criteria.where("state").is(state)));
//        query.addCriteria(new Criteria().andOperator(Criteria.where("_id").is(_id),Criteria.where("threadDumps.state").is(state)));
//
//        Criteria criteria = new Criteria().where("_id").in(_id);
//        MatchOperation matchOperation = Aggregation.match(criteria);
//        ProjectionOperation projectionOperation = Aggregation.project().and("hostName").as("hostName");
//        Aggregation aggregation = Aggregation.newAggregation(matchOperation,projectionOperation);

        ThreadStateDetail detail = mongoTemplate.findOne(query, ThreadStateDetail.class, "threaddump");
//          AggregationResults<ThreadStateDetail> aggregate =  mongoTemplate.aggregate(aggregation, "threaddump",ThreadStateDetail.class);
//          List<ThreadStateDetail> listDetail = aggregate.getMappedResults();
//          ThreadStateDetail detail = new ThreadStateDetail();
//          for (ThreadStateDetail threadStateDetail : listDetail) {
//              detail = threadStateDetail;
//          }

        // 나중에 mongotemplate으로 처리하자..
        int threadSize = detail.getThreadDumps().size();
        for (int i=0; i<threadSize; i++){
            if(!state.equals(detail.getThreadDumps().get(i).getState())) {
                detail.getThreadDumps().remove(i);
                i--;
                threadSize--;
            }
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

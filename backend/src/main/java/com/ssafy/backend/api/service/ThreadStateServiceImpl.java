package com.ssafy.backend.api.service;



import com.ssafy.backend.api.dto.response.ThreadStateListDto;
import com.ssafy.backend.core.domain.ThreadStateList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service("ThreadListService")
public class ThreadStateServiceImpl implements ThreadStateService {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public ThreadStateServiceImpl(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }



    @Override
    public List<ThreadStateListDto> getThreadList(List<String> hostIp, String startAt, String endAt) throws Exception {
        StringBuffer strHost = new StringBuffer();
        for (String str : hostIp){
            strHost.append("'"+str+"'"+",");
        }
        strHost.setLength(strHost.length()-1);
        BasicQuery query = new BasicQuery("{logTime: { $gte: '"+startAt+"', $lte: '"+endAt+"'}, hostIp:{$in:["+strHost+"]}}");
//        query.fields().exclude("_id");

        List<ThreadStateList> list = mongoTemplate.find(query, ThreadStateList.class, "threaddump");
        List<ThreadStateListDto> dtoList = new ArrayList<>();
        for(ThreadStateList entity : list){
            ThreadStateListDto dto = new ThreadStateListDto(entity);
            dtoList.add(dto);
        }
        return dtoList;
    }

}

package com.ssafy.backend.api.service;

import com.ssafy.backend.api.dto.response.HostListRes;
import com.ssafy.backend.core.domain.HostList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
//import org.springframework.data.mongodb.core.query.BasicQuery;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

//    @Override
//    public List<HostList> getHostList(String startAt, String endAt) {
//        BasicQuery query = new BasicQuery("{logTime: { $gte: '"+startAt+"', $lte: '"+endAt+"'}}");
//        query.fields().exclude("_id");
//
//        return mongoTemplate.find(query, HostList.class, "json_log");
//    }

    @Override
    public HostListRes getHostSearch(String startAt, String endAt, String query) {
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

        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        simpleDateFormat.setLenient(false);
        boolean isStartDate;
        try {
            simpleDateFormat.parse(startAt.trim());
            isStartDate = true;
        } catch (Exception e) {
            isStartDate = false;
        }
        boolean isEndDate;
        try {
            simpleDateFormat.parse(endAt.trim());
            isEndDate = true;
        } catch (Exception e) {
            isEndDate = false;
        }

        // startAt, endAt, query 모두 입력
        if(isRegex && !query.isEmpty() && isStartDate && isEndDate) {
            Query queryRegex = new Query();
            queryRegex.addCriteria(Criteria.where("hostName").regex(query))
                    .addCriteria(Criteria.where("logTime").gte(startAt).lte(endAt));

            List<HostList> queryResult = removeDuplicateHostList(mongoTemplate.find(queryRegex, HostList.class, "threaddump"));
            return new HostListRes(startAt, endAt, queryResult.size(), queryResult, query);
        // startAt, endAt 입력
        } else if(isRegex && query.isEmpty() && isStartDate && isEndDate) {
            Query queryRegex = new Query();
            queryRegex.addCriteria(Criteria.where("logTime").gte(startAt).lte(endAt));
            List<HostList> queryResult = removeDuplicateHostList(mongoTemplate.find(queryRegex, HostList.class, "threaddump"));
            return new HostListRes(startAt, endAt, queryResult.size(), queryResult, query);
        // 입력 Param 없음
        } else if(isRegex && query.isEmpty() && !isStartDate && !isEndDate) {
            Query queryRegex = new Query();
//            queryRegex.with(Sort.by(Sort.Order.desc("logTime")));
            List<HostList> queryResult = removeDuplicateHostList(mongoTemplate.find(queryRegex, HostList.class, "threaddump"));
            return new HostListRes(startAt, endAt, queryResult.size(), queryResult, query);
        // endAt 입력
        } else if(isRegex && query.isEmpty() && !isStartDate && isEndDate) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime tempEndDate = LocalDateTime.parse(endAt, formatter);
            String tempStartDate = tempEndDate.minusMinutes(1).format(formatter);
            System.out.println(tempStartDate);

            Query queryRegex = new Query();
            queryRegex.addCriteria(Criteria.where("logTime").gte(tempStartDate).lte(endAt))
                    .with(Sort.by(Sort.Order.desc("logTime")));
            List<HostList> queryResult = removeDuplicateHostList(mongoTemplate.find(queryRegex, HostList.class, "threaddump"));
            return new HostListRes(startAt, endAt, queryResult.size(), queryResult, query);
        // endAt, query 입력
        } else if(isRegex && !query.isEmpty() && !isStartDate && isEndDate) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime tempEndDate = LocalDateTime.parse(endAt, formatter);
            String tempStartDate = tempEndDate.minusMinutes(1).format(formatter);

            Query queryRegex = new Query();
            queryRegex.addCriteria(Criteria.where("logTime").gte(tempStartDate).lte(endAt))
                    .addCriteria(Criteria.where("hostName").regex(query))
                    .with(Sort.by(Sort.Order.desc("logTime")));
            List<HostList> queryResult = removeDuplicateHostList(mongoTemplate.find(queryRegex, HostList.class, "threaddump"));
            return new HostListRes(startAt, endAt, queryResult.size(), queryResult, query);
        // query 입력
        } else if(isRegex && !query.isEmpty() && !isStartDate && !isEndDate) {
            Query queryRegex = new Query();
            queryRegex.addCriteria(Criteria.where("hostName").regex(query));
            List<HostList> queryResult = removeDuplicateHostList(mongoTemplate.find(queryRegex, HostList.class, "threaddump"));
            return new HostListRes(startAt, endAt, queryResult.size(), queryResult, query);
        }
        else {
            return new HostListRes("", "", 0, new ArrayList<>(), "");
        }
    }

    private List<HostList> removeDuplicateHostList(List<HostList> input) {
        List<HostList> hostListWithoutDuplicate = new ArrayList<>();

        for(HostList hostListEach : input) {
            if(hostListWithoutDuplicate.stream().noneMatch(o -> o.getHostName().equals(hostListEach.getHostName()))) {
                hostListWithoutDuplicate.add(hostListEach);
            }
        }

        return hostListWithoutDuplicate;
    }
}

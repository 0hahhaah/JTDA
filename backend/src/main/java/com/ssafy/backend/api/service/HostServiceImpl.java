package com.ssafy.backend.api.service;

import com.ssafy.backend.api.dto.response.*;
import com.ssafy.backend.core.domain.HostList;
import com.ssafy.backend.core.domain.HostSearch;
import com.ssafy.backend.core.domain.HostState;
import com.ssafy.backend.core.domain.ThreadDumps;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
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
    public HostSearchRes getHostSearch(String startAt, String endAt, String query) {
        boolean isRegexFlag = isRegex(query);
        boolean isStartDate = isDateTime(startAt);
        boolean isEndDate = isDateTime(endAt);

        // startAt, endAt, query 모두 입력
        if(isRegexFlag && !query.isEmpty() && isStartDate && isEndDate) {
            Query queryRegex = new Query();
            queryRegex.addCriteria(Criteria.where("host").regex(query))
                    .addCriteria(Criteria.where("logTime").gte(startAt).lte(endAt));

            List<HostSearch> queryResult = removeDuplicateHostSearch(mongoTemplate.find(queryRegex, HostSearch.class, "threaddump"));
            return new HostSearchRes(startAt, endAt, queryResult.size(), queryResult, query);
        // startAt, endAt 입력
        } else if(isRegexFlag && query.isEmpty() && isStartDate && isEndDate) {
            Query queryRegex = new Query();
            queryRegex.addCriteria(Criteria.where("logTime").gte(startAt).lte(endAt));
            List<HostSearch> queryResult = removeDuplicateHostSearch(mongoTemplate.find(queryRegex, HostSearch.class, "threaddump"));
            return new HostSearchRes(startAt, endAt, queryResult.size(), queryResult, query);
        // 입력 Param 없음
        } else if(isRegexFlag && query.isEmpty() && !isStartDate && !isEndDate) {
            Query queryRegex = new Query();
//            queryRegex.with(Sort.by(Sort.Order.desc("logTime")));
            List<HostSearch> queryResult = removeDuplicateHostSearch(mongoTemplate.find(queryRegex, HostSearch.class, "threaddump"));
            return new HostSearchRes(startAt, endAt, queryResult.size(), queryResult, query);
        // endAt 입력
        } else if(isRegexFlag && query.isEmpty() && !isStartDate && isEndDate) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime tempEndDate = LocalDateTime.parse(endAt, formatter);
            String tempStartDate = tempEndDate.minusMinutes(1).format(formatter);
            System.out.println(tempStartDate);

            Query queryRegex = new Query();
            queryRegex.addCriteria(Criteria.where("logTime").gte(tempStartDate).lte(endAt))
                    .with(Sort.by(Sort.Order.desc("logTime")));
            List<HostSearch> queryResult = removeDuplicateHostSearch(mongoTemplate.find(queryRegex, HostSearch.class, "threaddump"));
            return new HostSearchRes(startAt, endAt, queryResult.size(), queryResult, query);
        // endAt, query 입력
        } else if(isRegexFlag && !query.isEmpty() && !isStartDate && isEndDate) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            LocalDateTime tempEndDate = LocalDateTime.parse(endAt, formatter);
            String tempStartDate = tempEndDate.minusMinutes(1).format(formatter);

            Query queryRegex = new Query();
            queryRegex.addCriteria(Criteria.where("logTime").gte(tempStartDate).lte(endAt))
                    .addCriteria(Criteria.where("host").regex(query))
                    .with(Sort.by(Sort.Order.desc("logTime")));
            List<HostSearch> queryResult = removeDuplicateHostSearch(mongoTemplate.find(queryRegex, HostSearch.class, "threaddump"));
            return new HostSearchRes(startAt, endAt, queryResult.size(), queryResult, query);
        // query 입력
        } else if(isRegexFlag && !query.isEmpty() && !isStartDate && !isEndDate) {
            Query queryRegex = new Query();
            queryRegex.addCriteria(Criteria.where("host").regex(query));
            List<HostSearch> queryResult = removeDuplicateHostSearch(mongoTemplate.find(queryRegex, HostSearch.class, "threaddump"));
            return new HostSearchRes(startAt, endAt, queryResult.size(), queryResult, query);
        }
        else {
            return new HostSearchRes("", "", 0, new ArrayList<>(), "");
        }
    }

    @Override
    public HostListRes getHostList(String startAt, String endAt, String cluster, String tags) {
        boolean isStartDate = isDateTime(startAt);
        boolean isEndDate = isDateTime(endAt);

        boolean isRegexFlag = false;
        if(!cluster.isEmpty()) {
            isRegexFlag = isRegex(cluster);
        }

        boolean isTag = false;
        List<String> tagList = new ArrayList<>();
        if(!tags.isEmpty()) {
            isTag = true;
            tagList = Arrays.asList(tags.split(","));
            for (String tag : tagList) {
                if (!isRegex(tag)) {
                    isTag = false;
                    break;
                }
            }
        }

        if(isStartDate && isEndDate && !isRegexFlag && !isTag) {
            Query query = new Query();
            query.addCriteria(Criteria.where("logTime").gte(startAt).lte(endAt));
            List<HostList> queryResult = removeDuplicateHostList(mongoTemplate.find(query, HostList.class, "threaddump"));
            return new HostListRes(startAt, endAt, new hostListSearchInputRes(cluster, tagList), queryResult.size(), queryResult);
        } else if(isStartDate && isEndDate && isRegexFlag && !isTag) {
            Query query = new Query();
            query.addCriteria(Criteria.where("logTime").gte(startAt).lte(endAt))
                    .addCriteria(Criteria.where("cluster").regex(cluster));
            List<HostList> queryResult = removeDuplicateHostList(mongoTemplate.find(query, HostList.class, "threaddump"));
            return new HostListRes(startAt, endAt, new hostListSearchInputRes(cluster, tagList), queryResult.size(), queryResult);
        } else if(isStartDate && isEndDate && !isRegexFlag && isTag) {
            Query query = new Query();
            query.addCriteria(Criteria.where("logTime").gte(startAt).lte(endAt))
                    .addCriteria(Criteria.where("tags").in(tagList));
            List<HostList> queryResult = removeDuplicateHostList(mongoTemplate.find(query, HostList.class, "threaddump"));
            return new HostListRes(startAt, endAt, new hostListSearchInputRes(cluster, tagList), queryResult.size(), queryResult);
        } else if(isStartDate && isEndDate && isRegexFlag && isTag) {
            Query query = new Query();
            query.addCriteria(Criteria.where("logTime").gte(startAt).lte(endAt))
                    .addCriteria(Criteria.where("cluster").regex(cluster))
                    .addCriteria(Criteria.where("tags").in(tagList));
            List<HostList> queryResult = removeDuplicateHostList(mongoTemplate.find(query, HostList.class, "threaddump"));
            return new HostListRes(startAt, endAt, new hostListSearchInputRes(cluster, tagList), queryResult.size(), queryResult);
        } else {
            return new HostListRes("", "", new hostListSearchInputRes("", new ArrayList<>()), 0, new ArrayList<>());
        }
    }


    @Override
    public HostStateRes getHostState(String _id) {
        List<String> _ids = new ArrayList<>();
        if(!_id.isEmpty()) {
            _ids = Arrays.asList(_id.split(","));
        }
        Set<String> _idsNoDuplicate = new HashSet<>(_ids);

        Query query = new Query();
        query.addCriteria(Criteria.where("_id").in(_idsNoDuplicate))
                .with(Sort.by(Sort.Direction.ASC, "host"));
        List<HostState> queryResult = mongoTemplate.find(query, HostState.class, "threaddump");
        List<HostStateWithDaemonCountRes> returnHosts = new ArrayList<>();

        for(HostState hostState : queryResult) {
            int daemonCount = 0;
            int nonDaemonCount = 0;
            List<ThreadDumps> threadDumpsList = hostState.getThreadDumps();
            for(ThreadDumps threadDumps : threadDumpsList) {
                if(threadDumps.isDaemon()) {
                    daemonCount += 1;
                } else {
                    nonDaemonCount += 1;
                }
            }
            returnHosts.add(new HostStateWithDaemonCountRes(hostState.get_id(), hostState.getHost(), hostState.getLogTime(), hostState.getThreadCount(), hostState.getThreadStateCount(), daemonCount, nonDaemonCount));
        }

        return new HostStateRes(returnHosts);
    }


    private boolean isDateTime(String input) {
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        simpleDateFormat.setLenient(false);

        try {
            simpleDateFormat.parse(input.trim());
            return true;
        } catch (ParseException e) {
            return false;
        }
    }

    private boolean isRegex(String input) {
        try {
            input = URLDecoder.decode(input, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        try {
            Pattern.compile(input);
            return true;
        } catch (PatternSyntaxException e) {
            return false;
        }
    }

    private List<HostSearch> removeDuplicateHostSearch(List<HostSearch> input) {
        Set<HostSearch> setInput = new HashSet<>(input);

        return new ArrayList<>(setInput);
//        List<HostSearch> hostSearchWithoutDuplicate = new ArrayList<>();
//
//        for(HostSearch hostSearchEach : input) {
//            if(hostSearchWithoutDuplicate.stream().noneMatch(o -> o.getHost().equals(hostSearchEach.getHost()))) {
//                hostSearchWithoutDuplicate.add(hostSearchEach);
//            }
//        }
//
//        return hostSearchWithoutDuplicate;
    }

    private List<HostList> removeDuplicateHostList(List<HostList> input) {
        Set<HostList> setInput = new HashSet<>(input);

        return new ArrayList<>(setInput);
//        for(HostList hostListEach : input) {
//            if(hostListWithoutDuplicate.stream().noneMatch(o -> o.getHost().equals(hostListEach.getHost()))) {
//                hostListWithoutDuplicate.add(hostListEach);
//            }
//        }
//
//        return hostListWithoutDuplicate;
    }
}

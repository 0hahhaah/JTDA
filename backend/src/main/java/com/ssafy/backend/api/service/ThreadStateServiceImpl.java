package com.ssafy.backend.api.service;



import com.ssafy.backend.api.dto.response.ThreadStateListDto;
import com.ssafy.backend.core.domain.Hosts;
import com.ssafy.backend.core.domain.ThreadStateCountList;
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
    public ThreadStateListDto getThreadList(List<String> host, String startAt, String endAt) throws Exception {

        StringBuffer strHost = new StringBuffer();
        for (String str : host){
            strHost.append("'"+str+"'"+",");
        }
        strHost.setLength(strHost.length()-1);

//        BasicQuery query = new BasicQuery("{logTime: { $gte: '"+startAt+"', $lte: '"+endAt+"'}, host:{$in:["+strHost+"]}}");
        BasicQuery query = new BasicQuery("{logTime: { $gte: '"+startAt+"', $lte: '"+endAt+"'},host:{$in:["+strHost+"]}}");
//        query.fields().exclude("_id");

        List<ThreadStateList> list = mongoTemplate.find(query, ThreadStateList.class, "threaddump");
//        System.out.println(list.get(0).getHost());
        List<Hosts> hosts = new ArrayList<>();
        List<String> hostList = new ArrayList<>();
        List <String> logTimeList = new ArrayList<>();



        for(ThreadStateList entity : list){
            if(!logTimeList.contains(entity.getLogTime().substring(0,16))) logTimeList.add(entity.getLogTime().substring(0,16));
            if(!hostList.contains(entity.getHost())) {
                hostList.add(entity.getHost());
//                hosts.add(new Hosts(entity.getHost()));
            }
        }
        List<Integer> RUNNABLE = new ArrayList<>();
        List<Integer> BLOCKED = new ArrayList<>();
        List<Integer> WAITING = new ArrayList<>();
        List<Integer> TIMED_WAITING = new ArrayList<>();

        for(int i =0; i<logTimeList.size(); i++){
            int runnable = 0;
            int blocked = 0;
            int waiting = 0;
            int time_waiting = 0;

            for(ThreadStateList entity : list){

                if(logTimeList.get(i).equals(entity.getLogTime().substring(0,16))){
                    runnable += entity.getThreadStateCount().getRUNNABLE();
                    blocked += entity.getThreadStateCount().getBLOCKED();
                    waiting += entity.getThreadStateCount().getWAITING();
                    time_waiting += entity.getThreadStateCount().getTIMED_WAITING();
                }
                // ThreadStateCountList 리스트화
            }
            RUNNABLE.add(runnable);
            BLOCKED.add(blocked);
            WAITING.add(waiting);
            TIMED_WAITING.add(time_waiting);

        }

        ThreadStateCountList threadStateCountList = new ThreadStateCountList(RUNNABLE,BLOCKED,WAITING,TIMED_WAITING);

        for(int i=0; i<hostList.size(); i++){

            List <String> _idList = new ArrayList<>();

            for(ThreadStateList entity : list){

                if(hostList.get(i).equals(entity.getHost())){
                    // _id 리스트화
                    _idList.add(entity.get_id());

                }

            }
            hosts.add(new Hosts(hostList.get(i),_idList));
        }
//        threadStateListDto.setHosts(hosts);
//        threadStateListDto.setThreadStateCountList(threadStateCountList);
//        threadStateListDto.setLogTime(logTimeList);
//        threadStateListDto.setDataCount(logTimeList.size());
        ThreadStateListDto threadStateListDto = new ThreadStateListDto(hosts, logTimeList.size(), logTimeList, threadStateCountList);

//        System.out.println(hosts.get(0).getHost());

        return threadStateListDto;
    }

//    public List<ThreadStateListDto> getThreadList(List<String> host, String startAt, String endAt) throws Exception {
//        StringBuffer strHost = new StringBuffer();
//        for (String str : host){
//            strHost.append("'"+str+"'"+",");
//        }
//        strHost.setLength(strHost.length()-1);
//        BasicQuery query = new BasicQuery("{logTime: { $gte: '"+startAt+"', $lte: '"+endAt+"'}, host:{$in:["+strHost+"]}}");
////        BasicQuery query = new BasicQuery("{logTime: { $gte: '"+startAt+"', $lte: '"+endAt+"'},  host: '"+host+"'}");
////        query.fields().exclude("_id");
//
//        List<ThreadStateList> list = mongoTemplate.find(query, ThreadStateList.class, "threaddump");
//
//        List<ThreadStateListDto> dtoList = new ArrayList<>();
//
//        List<String> hostList = new ArrayList<>();
//
//        // List<ThreadStateListDto> 각 host 마다 미리 만들어 두기
//        List <String> logTimeList = new ArrayList<>();
//        for(ThreadStateList entity : list){
//            if(!logTimeList.contains(entity.getLogTime().substring(0,15))) logTimeList.add(entity.getLogTime().substring(0,15));
//            if(!hostList.contains(entity.getHost())) {
//                hostList.add(entity.getHost());
//                ThreadStateListDto dto = new ThreadStateListDto(entity.getCluster(), entity.getHost(), entity.getTags());
//                dtoList.add(dto);
//            }
//        }
//
//        for(int i=0; i<hostList.size(); i++){
//
//            List <String> _idList = new ArrayList<>();
//            List <Integer> threadCountList = new ArrayList<>();
//            List<Integer> RUNNABLE = new ArrayList<>();
//            List<Integer> BLOCKED = new ArrayList<>();
//            List<Integer> WAITING = new ArrayList<>();
//            List<Integer> TIMED_WAITING = new ArrayList<>();
//
//            for(ThreadStateList entity : list){
//
//                if(hostList.get(i).equals(entity.getHost())){
//                    // _id 리스트화
//                    _idList.add(entity.get_id());
//
//                    // threadCountList 리스트화
//                    threadCountList.add(entity.getThreadCount());
//
//                    // ThreadStateCountList 리스트화
//                    RUNNABLE.add(entity.getThreadStateCount().getRUNNABLE());
//                    BLOCKED.add(entity.getThreadStateCount().getBLOCKED());
//                    WAITING.add(entity.getThreadStateCount().getWAITING());
//                    TIMED_WAITING.add(entity.getThreadStateCount().getTIMED_WAITING());
//                }
//                // dto에 setting
//            }
//            ThreadStateCountList threadStateCountList = new ThreadStateCountList(RUNNABLE,BLOCKED,WAITING,TIMED_WAITING);
//            ThreadStateListDto threadStateListDto =dtoList.get(i);
//            threadStateListDto.set_ids(_idList);
//            threadStateListDto.setThreadCounts(threadCountList);
//            threadStateListDto.setThreadStateCount(threadStateCountList);
//            dtoList.set(i,threadStateListDto);
//        }
//
//        // dto 리스트화
//        return dtoList;
//    }

//    public ThreadStateListDto setThreadStateListDto(ThreadStateList entity) {
//        ThreadStateListDto dto = new ThreadStateListDto(entity);
//        List <String> _idList = new ArrayList<>();
//        List <Integer> threadCountList = new ArrayList<>();
//        List<Integer> RUNNABLE = new ArrayList<>();
//        List<Integer> BLOCKED = new ArrayList<>();
//        List<Integer> WAITING = new ArrayList<>();
//        List<Integer> TIMED_WAITING = new ArrayList<>();
//        _idList.add(entity.get_id());
//        threadCountList.add(entity.getThreadCount());
//        RUNNABLE.add(entity.getThreadStateCount().getRUNNABLE());
//        BLOCKED.add(entity.getThreadStateCount().getBLOCKED());
//        WAITING.add(entity.getThreadStateCount().getWAITING());
//        TIMED_WAITING.add(entity.getThreadStateCount().getTIMED_WAITING());
//        ThreadStateCountList threadStateCountList = new ThreadStateCountList(RUNNABLE,BLOCKED,WAITING,TIMED_WAITING);
//        dto.set_ids(_idList);
//        dto.setThreadCounts(threadCountList);
//        dto.setThreadStateCount(threadStateCountList);
//        return null;
//    }

}

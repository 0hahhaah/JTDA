package com.ssafy.backend.api.service;



import com.ssafy.backend.api.dto.response.ThreadStateListDto;
import com.ssafy.backend.core.domain.ThreadStateCount;


import java.util.List;
import java.util.TreeMap;

public interface ThreadStateService {

    ThreadStateListDto getThreadList(List<String> host, String startAt, String endAt) throws Exception;
//    TreeMap<String, ThreadStateCount> getThreadList2(List<String> host, String startAt, String endAt) throws Exception;
}

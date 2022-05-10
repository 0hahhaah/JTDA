package com.ssafy.backend.api.service;



import com.ssafy.backend.api.dto.response.ThreadStateListDto;


import java.util.List;

public interface ThreadStateService {

    List<ThreadStateListDto> getThreadList(List<String> hostIp, String startAt, String endAt) throws Exception;
    
}

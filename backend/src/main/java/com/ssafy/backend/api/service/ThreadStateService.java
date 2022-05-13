package com.ssafy.backend.api.service;



import com.ssafy.backend.api.dto.response.ThreadStateListDto;


import java.util.List;

public interface ThreadStateService {

    ThreadStateListDto getThreadList(List<String> host, String startAt, String endAt) throws Exception;
    
}

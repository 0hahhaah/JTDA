package com.ssafy.backend.api.service;

import com.ssafy.backend.api.dto.response.ThreadStateDetailDto;

import java.util.List;

public interface ThreadStateDetailService {
    ThreadStateDetailDto getThreadStateDetailList(String _id, String state) throws Exception;
}

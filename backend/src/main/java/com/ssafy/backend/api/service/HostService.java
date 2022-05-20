package com.ssafy.backend.api.service;

import com.ssafy.backend.api.dto.response.HostListRes;
import com.ssafy.backend.api.dto.response.HostSearchRes;
import com.ssafy.backend.api.dto.response.HostStateRes;
import com.ssafy.backend.api.dto.response.HostTagRes;


public interface HostService {

    HostSearchRes getHostSearch(String startAt, String endAt, String query);

    HostListRes getHostList(String startAt, String endAt, String cluster, String tags);

    HostStateRes getHostState(String host, String time);

    HostTagRes getHostTag(String startAt, String endAt);
}

package com.ssafy.backend.api.service;

import com.ssafy.backend.api.dto.response.HostListRes;
import com.ssafy.backend.api.dto.response.HostSearchRes;


public interface HostService {

//    List<HostList> getHostList(String startAt, String endAt);
//
//    List<HostList> getHostSearch(String query);

    HostSearchRes getHostSearch(String startAt, String endAt, String query);

    HostListRes getHostList(String startAt, String endAt, String cluster, String tags);
}

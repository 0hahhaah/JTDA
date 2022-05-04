package com.ssafy.backend.api.service;

import com.ssafy.backend.core.domain.HostList;

import java.util.List;

public interface HostService {

    List<HostList> getHostList(String startAt, String endAt);
}

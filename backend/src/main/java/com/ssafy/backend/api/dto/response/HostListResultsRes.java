package com.ssafy.backend.api.dto.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("HostListResultsResponse")
public class HostListResultsRes {

    private String cluster;
    private List<HostListResultsEachRes> hosts;

    public HostListResultsRes(String cluster, List<HostListResultsEachRes> hosts) {
        this.cluster = cluster;
        this.hosts = hosts;
    }
}

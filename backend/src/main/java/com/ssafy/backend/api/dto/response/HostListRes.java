package com.ssafy.backend.api.dto.response;

import com.ssafy.backend.core.domain.HostList;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("HostListResponse")
public class HostListRes {

    private String startAt;

    private String endAt;

    private String searchQuery;

    private int hostCount;

    private List<HostList> hosts;

    public HostListRes(String startAt, String endAt, int hostCount, List<HostList> hosts, String searchQuery) {
        this.startAt = startAt;
        this.endAt = endAt;
        this.searchQuery = searchQuery;
        this.hostCount = hostCount;
        this.hosts = hosts;
    }
}

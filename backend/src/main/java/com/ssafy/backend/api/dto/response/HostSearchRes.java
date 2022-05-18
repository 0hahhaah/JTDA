package com.ssafy.backend.api.dto.response;

import com.ssafy.backend.core.domain.HostSearch;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("HostSearchResponse")
public class HostSearchRes {

    private String startAt;

    private String endAt;

    private String searchQuery;

    private int hostCount;

    private List<HostSearch> hosts;

    public HostSearchRes(String startAt, String endAt, int hostCount, List<HostSearch> hosts, String searchQuery) {
        this.startAt = startAt;
        this.endAt = endAt;
        this.searchQuery = searchQuery;
        this.hostCount = hostCount;
        this.hosts = hosts;
    }
}

package com.ssafy.backend.api.dto.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("HostListResultsEachHostResponse")
public class HostListResultsEachRes implements Comparable<HostListResultsEachRes> {

    private String host;
    private List<String> tags;

    public HostListResultsEachRes(String host, List<String> tags) {
        this.host = host;
        this.tags = tags;
    }

    @Override
    public int compareTo(HostListResultsEachRes obj) {
        return host.compareTo(obj.getHost());
    }
}

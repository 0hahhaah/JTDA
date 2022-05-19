package com.ssafy.backend.api.dto.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("HostListSearchInputResponse")
public class hostListSearchInputRes {
    private String cluster;
    private List<String> tags;

    public hostListSearchInputRes(String cluster, List<String> tags) {
        this.cluster = cluster;
        this.tags = tags;
    }
}

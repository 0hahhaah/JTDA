package com.ssafy.backend.api.dto.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("HostListResponse")
public class HostListRes {
    private String hostIp;
    private String hostName;

    public HostListRes(String hostIp, String hostName) {
        this.hostIp = hostIp;
        this.hostName = hostName;
    }
}

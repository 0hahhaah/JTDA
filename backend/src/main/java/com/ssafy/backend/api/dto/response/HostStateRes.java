package com.ssafy.backend.api.dto.response;

import com.ssafy.backend.core.domain.HostState;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("HostStateResponse")
public class HostStateRes {

    private List<HostStateWithDaemonCountRes> hosts;

    public HostStateRes(List<HostStateWithDaemonCountRes> hosts) {
        this.hosts = hosts;
    }
}

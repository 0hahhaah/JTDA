package com.ssafy.backend.api.dto.response;

import com.ssafy.backend.core.domain.ThreadStateCount;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@ApiModel("HostStateWithDaemonCountResponse")
public class HostStateWithDaemonCountRes {

    private String _id;

    private String host;

    private String logTime;

    private int threadCount;

    private ThreadStateCount threadStateCount;

    private int daemonCount;

    private int nonDaemonCount;

    public HostStateWithDaemonCountRes(String _id, String host, String logTime, int threadCount, ThreadStateCount threadStateCount, int daemonCount, int nonDaemonCount) {
        this._id = _id;
        this.host = host;
        this.logTime = logTime;
        this.threadCount = threadCount;
        this.threadStateCount = threadStateCount;
        this.daemonCount = daemonCount;
        this.nonDaemonCount = nonDaemonCount;
    }
}

package com.ssafy.backend.api.dto.response;



import com.ssafy.backend.core.domain.ThreadDumps;
import com.ssafy.backend.core.domain.ThreadStateDetail;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("ThreadResponse")
public class ThreadStateDetailDto {
    private String hostName;

    private String hostIp;

    private String processId;

    private String logTime;

    private List<ThreadDumps> threadDumps;
    public ThreadStateDetailDto(){}

    public ThreadStateDetailDto(ThreadStateDetail threadStateDetail){
        this.hostName = threadStateDetail.getHostName();
        this.hostIp = threadStateDetail.getHostIp();
        this.processId = threadStateDetail.getProcessId();
        this.logTime = threadStateDetail.getLogTime();
        this.threadDumps = threadStateDetail.getThreadDumps();
    }

    public ThreadStateDetailDto(String hostName, String hostIp, String processId, String logTime, List<ThreadDumps> threadDumps) {
        this.hostName = hostName;
        this.hostIp = hostIp;
        this.processId = processId;
        this.logTime = logTime;
        this.threadDumps = threadDumps;
    }
}

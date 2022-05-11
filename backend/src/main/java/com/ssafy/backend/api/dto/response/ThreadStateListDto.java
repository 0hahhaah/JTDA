package com.ssafy.backend.api.dto.response;

import com.ssafy.backend.core.domain.ThreadStateCount;
import com.ssafy.backend.core.domain.ThreadStateList;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("ThreadResponse")
public class ThreadStateListDto {

    private String _id;
    private String hostName;

    private String hostIp;

    private String logTime;

    private ThreadStateCount threadStateCount;

    public ThreadStateListDto(ThreadStateList threadStateList){
        this._id = threadStateList.get_id();
        this.hostName = threadStateList.getHostName();
        this.hostIp = threadStateList.getHostIp();
        this.logTime = threadStateList.getLogTime();
        this.threadStateCount = threadStateList.getThreadStateCount();
    }

    public ThreadStateListDto(String _id, String hostName, String hostIp, String logTime, ThreadStateCount threadStateCount) {
        this._id = _id;
        this.hostName = hostName;
        this.hostIp = hostIp;
        this.logTime = logTime;
        this.threadStateCount = threadStateCount;
    }
}

package com.ssafy.backend.api.dto.response;

import com.ssafy.backend.core.domain.ThreadStateCountList;
import com.ssafy.backend.core.domain.ThreadStateList;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("ThreadResponse")
public class ThreadStateListDto {


    private List<String> hosts;

    private int dataCount;
    private List<String> logTime;

    private ThreadStateCountList threadStateCountList;

    public ThreadStateListDto(ThreadStateList threadStateList){
//        this._id = threadStateList.get_id();
//        this.cluster = threadStateList.getCluster();
//        this.host = threadStateList.getHost();
//        this.tags = threadStateList.getTags();
//        this.logTime = threadStateList.getLogTime();
//        this.threadStateCount = threadStateList.getThreadStateCount();
    }

    public ThreadStateListDto() { }

    public ThreadStateListDto(List<String> hosts, int dataCount, List<String> logTime, ThreadStateCountList threadStateCountList) {
        this.hosts = hosts;
        this.dataCount = dataCount;
        this.logTime = logTime;
        this.threadStateCountList = threadStateCountList;
    }
}

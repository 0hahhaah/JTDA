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

    private String _id;

    private String cluster;

    private String host;

    private String [] tags;

    private String logTime;

    private List<ThreadDumps> threadDumps;
    public ThreadStateDetailDto(){}

    public ThreadStateDetailDto(ThreadStateDetail threadStateDetail){
        this._id = threadStateDetail.get_id();
        this.cluster = threadStateDetail.getCluster();
        this.host = threadStateDetail.getHost();
        this.tags = threadStateDetail.getTags();
        this.logTime = threadStateDetail.getLogTime();
        this.threadDumps = threadStateDetail.getThreadDumps();
    }

    public ThreadStateDetailDto(String _id, String cluster, String host, String[] tags, String logTime, List<ThreadDumps> threadDumps) {
        this._id = _id;
        this.cluster = cluster;
        this.host = host;
        this.tags = tags;
        this.logTime = logTime;
        this.threadDumps = threadDumps;
    }
}

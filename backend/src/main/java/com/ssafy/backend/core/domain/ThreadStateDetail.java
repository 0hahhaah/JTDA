package com.ssafy.backend.core.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "threaddump")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class ThreadStateDetail {
    private String hostName;

    private String hostIp;

    private String processId;

    private String logTime;

    private List<ThreadDumps> threadDumps;

    public ThreadStateDetail(String hostName, String hostIp, String processId, String logTime, List<ThreadDumps> threadDumps) {
        this.hostName = hostName;
        this.hostIp = hostIp;
        this.processId = processId;
        this.logTime = logTime;
        this.threadDumps = threadDumps;
    }
}

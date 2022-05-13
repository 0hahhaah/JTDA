package com.ssafy.backend.core.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "threaddump")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class HostState {

    @Id
    private String _id;

    private String host;

    private String logTime;

    private int threadCount;

    private ThreadStateCount threadStateCount;

    private List<ThreadDumps> threadDumps;

    public HostState(String _id, String host, String logTime, int threadCount, ThreadStateCount threadStateCount, List<ThreadDumps> threadDumps) {
        this._id = _id;
        this.host = host;
        this.logTime = logTime;
        this.threadCount = threadCount;
        this.threadStateCount = threadStateCount;
        this.threadDumps = threadDumps;
    }
}

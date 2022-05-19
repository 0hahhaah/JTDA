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

    private String _id;

    private String cluster;

    private String host;

    private String [] tags;

    private String logTime;

    private List<ThreadDumps> threadDumps;

    public ThreadStateDetail(String _id, String cluster, String host, String[] tags, String logTime, List<ThreadDumps> threadDumps) {
        this._id = _id;
        this.cluster = cluster;
        this.host = host;
        this.tags = tags;
        this.logTime = logTime;
        this.threadDumps = threadDumps;
    }
}

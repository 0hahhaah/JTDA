package com.ssafy.backend.core.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "json_log")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class ThreadStateList {

    private String _id;

    private String cluster;

    private String host;

    private String [] tags;

    private String logTime;

    private int threadCount;

    private ThreadStateCount threadStateCount;

    public ThreadStateList(String _id, String cluster, String host, String[] tags, String logTime, int threadCount, ThreadStateCount threadStateCount) {
        this._id = _id;
        this.cluster = cluster;
        this.host = host;
        this.tags = tags;
        this.logTime = logTime;
        this.threadCount = threadCount;
        this.threadStateCount = threadStateCount;
    }
}

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
    private String hostName;

    private String hostIp;

    private String logTime;

    private ThreadStateCount threadStateCount;


    public ThreadStateList(String _id, String hostName, String hostIp, String logTime, ThreadStateCount threadStateCount) {
        this._id = _id;
        this.hostName = hostName;
        this.hostIp = hostIp;
        this.logTime = logTime;
        this.threadStateCount = threadStateCount;
    }
}

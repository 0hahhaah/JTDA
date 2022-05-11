package com.example.kafkaconsumermongodb.threadlog;


import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Document(collection = "threaddump")
public class ThreadLog {
    @NotBlank
    public String cluster;
    @NotBlank
    public String host;
    @NotBlank
    private String [] tags;

    private String logTime;

    private int threadCount;

    private String vmInfo;

    private String [] threadElements;

    public ThreadDump [] threadDumps;

    public ThreadDump[] getThreadDumps() {
        return this.threadDumps;
    }

    private ThreadStateCount threadStateCount;

    public void setThreadStateCount(ThreadStateCount threadStateCount) {
        this.threadStateCount = threadStateCount;
    }
}

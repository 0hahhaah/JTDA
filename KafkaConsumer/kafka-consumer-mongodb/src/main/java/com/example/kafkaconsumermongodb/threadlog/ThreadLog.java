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
    public String hostName;
    @NotBlank
    public String hostIp;
    @NotBlank
    private String processId;

    private String logTime;

    private int threadCount;

    private String vmInfo;

    private String [] threadElements;

    public ThreadDump [] threadDumps;
}

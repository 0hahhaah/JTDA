package com.example.kafkaconsumermongodb.threadlog;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ThreadDump {

    protected String id;

    protected String hashId;

    protected String name;

    protected String state;

    public String getState() {
        return this.state;
    }

    protected int priority;

    protected boolean isDaemon;

    protected String lockOwner;

    protected String[] stackTrace;

    protected String[] lockedOwnableSynchronizers;
}

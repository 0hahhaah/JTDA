package com.ssafy.backend.core.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;


@Getter
@Setter
@ToString
@NoArgsConstructor
public class ThreadDumps {

    protected String id;

    protected String hashId;

    protected String name;

    protected String state;

    protected int priority;

    protected boolean isDaemon;

    protected String lockOwner;

    protected String[] stackTrace;

    protected String[] lockedOwnableSynchronizers;

    public ThreadDumps(String id, String hashId, String name, String state, int priority, boolean isDaemon, String lockOwner, String[] stackTrace, String[] lockedOwnableSynchronizers) {
        this.id = id;
        this.hashId = hashId;
        this.name = name;
        this.state = state;
        this.priority = priority;
        this.isDaemon = isDaemon;
        this.lockOwner = lockOwner;
        this.stackTrace = stackTrace;
        this.lockedOwnableSynchronizers = lockedOwnableSynchronizers;
    }
}

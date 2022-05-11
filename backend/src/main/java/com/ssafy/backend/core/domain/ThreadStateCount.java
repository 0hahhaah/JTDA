package com.ssafy.backend.core.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ThreadStateCount {
    protected int RUNNABLE;
    protected int BLOCKED;
    protected int WAITING;
    protected int TIMED_WAITING;

    public ThreadStateCount(int RUNNABLE, int BLOCKED, int WAITING, int TIMED_WAITING) {
        this.RUNNABLE = RUNNABLE;
        this.BLOCKED = BLOCKED;
        this.WAITING = WAITING;
        this.TIMED_WAITING = TIMED_WAITING;
    }
}

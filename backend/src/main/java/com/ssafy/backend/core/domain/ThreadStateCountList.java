package com.ssafy.backend.core.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ThreadStateCountList {
    protected List<Integer> RUNNABLE;
    protected List<Integer> BLOCKED;
    protected List<Integer> WAITING;
    protected List<Integer> TIMED_WAITING;

    public ThreadStateCountList(List<Integer> RUNNABLE, List<Integer> BLOCKED, List<Integer> WAITING, List<Integer> TIMED_WAITING) {
        this.RUNNABLE = RUNNABLE;
        this.BLOCKED = BLOCKED;
        this.WAITING = WAITING;
        this.TIMED_WAITING = TIMED_WAITING;
    }
}

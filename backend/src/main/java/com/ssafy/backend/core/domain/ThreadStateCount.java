package com.ssafy.backend.core.domain;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ThreadStateCount {
    @JsonProperty("RUNNABLE")
    protected int RUNNABLE;
    @JsonProperty("BLOCKED")
    protected int BLOCKED;
    @JsonProperty("WAITING")
    protected int WAITING;
    @JsonProperty("TIMED_WAITING")
    protected int TIMED_WAITING;

    public ThreadStateCount(int RUNNABLE, int BLOCKED, int WAITING, int TIMED_WAITING) {
        this.RUNNABLE = RUNNABLE;
        this.BLOCKED = BLOCKED;
        this.WAITING = WAITING;
        this.TIMED_WAITING = TIMED_WAITING;
    }
}

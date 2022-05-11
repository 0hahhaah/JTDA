package com.example.kafkaconsumermongodb.threadlog;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ThreadStateCount {
    protected int RUNNABLE;
    protected int BLOCKED;
    protected int WAITING;
    protected int TIMED_WAITING;

    public int getRUNNABLE() {
        return RUNNABLE;
    }

    public void setRUNNABLE(int RUNNABLE) {
        this.RUNNABLE = RUNNABLE;
    }

    public int getBLOCKED() {
        return BLOCKED;
    }

    public void setBLOCKED(int BLOCKED) {
        this.BLOCKED = BLOCKED;
    }

    public int getWAITING() {
        return WAITING;
    }

    public void setWAITING(int WAITING) {
        this.WAITING = WAITING;
    }

    public int getTIMED_WAITING() {
        return TIMED_WAITING;
    }

    public void setTIMED_WAITING(int TIMED_WAITING) {
        this.TIMED_WAITING = TIMED_WAITING;
    }
}

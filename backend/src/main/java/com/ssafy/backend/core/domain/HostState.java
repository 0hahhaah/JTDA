package com.ssafy.backend.core.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "threaddump")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class HostState implements Comparable<HostState>{

    @Id
    private String _id;

    private String host;

    private String logTime;

    private int threadCount;

    private ThreadStateCount threadStateCount;

    private List<ThreadDumps> threadDumps;

    public HostState(String _id, String host, String logTime, int threadCount, ThreadStateCount threadStateCount, List<ThreadDumps> threadDumps) {
        this._id = _id;
        this.host = host;
        this.logTime = logTime;
        this.threadCount = threadCount;
        this.threadStateCount = threadStateCount;
        this.threadDumps = threadDumps;
    }

    // HashSet 중복 제거
    @Override
    public int hashCode() {
        return host.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if(!(obj instanceof HostState)) {
            return false;
        }
        HostState hostState = (HostState) obj;
        return host.equals(hostState.host);
    }

    @Override
    public int compareTo(HostState obj) {
        return host.compareTo(obj.getHost());
    }
}

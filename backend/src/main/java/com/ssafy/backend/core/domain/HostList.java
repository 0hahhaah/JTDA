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
public class HostList {

    @Id
    private String _id;

    private String cluster;

    private String host;

    private List<String> tags;

    public HostList(String cluster, String host, List<String> tags) {
        this.cluster = cluster;
        this.host = host;
        this.tags = tags;
    }

    // HashSet 중복 제거
    @Override
    public int hashCode() {
        return host.hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if(!(obj instanceof HostList)) {
            return false;
        }
        HostList hostList = (HostList) obj;
        return host.equals(hostList.host);
    }
}

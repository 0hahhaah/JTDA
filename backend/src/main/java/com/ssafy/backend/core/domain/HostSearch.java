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
public class HostSearch {

    @Id
    private String _id;
    private String cluster;
    private String host;

    private List<String> tags;

    protected HostSearch(String cluster, String host, List<String> tags) {
        this.cluster = cluster;
        this.host = host;
        this.tags = tags;
    }
}

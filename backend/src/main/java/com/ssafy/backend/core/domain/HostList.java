package com.ssafy.backend.core.domain;


import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
//import org.bson.types.ObjectId;
//import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "json_log")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class HostList {

    private String hostName;
    private String hostIp;

    protected HostList(String hostName, String hostIp) {
        this.hostName = hostName;
        this.hostIp = hostIp;
    }
}

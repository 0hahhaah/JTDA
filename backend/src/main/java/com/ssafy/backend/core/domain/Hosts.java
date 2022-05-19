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
public class Hosts {

    private String host;

    private String [] _ids;

    public Hosts(String host) {
        this.host = host;
    }

    public Hosts(String host, String [] _ids) {
        this.host = host;
        this._ids = _ids;
    }
}

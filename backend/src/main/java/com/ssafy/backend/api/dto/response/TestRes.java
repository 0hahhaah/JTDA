package com.ssafy.backend.api.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TestRes {
    private String test;

    public TestRes(String test) {
        this.test = test;
    }
}

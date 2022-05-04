package com.ssafy.backend.api.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
public class TestServiceTest {

    @Autowired
    TestServiceImpl testService;

    @Test
    public void Test_GET() {
        List<com.ssafy.backend.core.domain.Test> testList = testService.getTestList();

        for(com.ssafy.backend.core.domain.Test test : testList) {
            assertThat(test.getTest()).isEqualTo("Hello World!");
        }
    }

}
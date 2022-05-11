package com.ssafy.backend.api.service;

import com.ssafy.backend.api.dto.response.HostListRes;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

//import java.time.LocalDateTime;
//import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
public class HostServiceTest {

    @Autowired
    HostServiceImpl hostService;

//    @Test
//    public void HostList_GET() {
//        LocalDateTime now = LocalDateTime.now();
//        LocalDateTime startDate = now.minusDays(2);
//
//        List<HostList> hostList = hostService.getHostList(startDate.toString(), now.toString());
//
//        for(HostList host : hostList) {
//            assertThat(host.getHostIp()).isNotEmpty();
//            assertThat(host.getHostName()).isNotEmpty();
//        }
//    }

    @Test
    public void HostSearch_GET() {
        HostListRes hostListRes = hostService.getHostSearch("2022-05-09 12:00:00", "2022-05-10 12:00:00", "cc");

        assertThat(hostListRes.getHosts()).isNotEmpty();
    }
}

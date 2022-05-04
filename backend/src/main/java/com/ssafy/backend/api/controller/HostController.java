package com.ssafy.backend.api.controller;

import com.ssafy.backend.api.service.HostService;
import com.ssafy.backend.core.domain.HostList;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/host")
@Api(value = "Host 조회", tags = "Host")
public class HostController {

    private final HostService hostService;

    @Autowired
    public HostController(HostService hostService) {
        this.hostService = hostService;
    }

    @GetMapping("/list")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Page Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @Operation(summary = "Host 리스트 반환 API", description = "Collection json_log 내 특정 기간 내의 hostIp, hostName 항목을 반환")
    public ResponseEntity<Map<String, Object>> showHostList(
            @RequestParam String startAt,
            @RequestParam String endAt) {
        List<HostList> hostList = removeDuplicateHostList(hostService.getHostList(startAt, endAt));

        Map<String, Object> response = new HashMap<>();
        response.put("startAt", startAt);
        response.put("endAt", endAt);
        response.put("hostCount", hostListWithoutDuplicate.size());
        response.put("hosts", hostListWithoutDuplicate);

        return ResponseEntity.status(200).body(response);
    }


    @GetMapping("/search")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Page Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @Operation(summary = "Host 검색 반환 API", description = "Collection json_log 내 hostName 검색 결과 반환")
    public ResponseEntity<Map<String, Object>> showHostSearch(
            @RequestParam String query) {
        List<HostList> hostList = removeDuplicateHostList(hostService.getHostSearch(query));

        Map<String, Object> response = new HashMap<>();
        response.put("inputWord", query);
        response.put("count", hostList.size());
        response.put("searchResults", hostList);

        return ResponseEntity.ok(response);
    }

    private List<HostList> removeDuplicateHostList(List<HostList> input) {
        List<HostList> hostListWithoutDuplicate = new ArrayList<>();

        for(HostList hostListEach : input) {
            if(hostListWithoutDuplicate.stream().noneMatch(o -> o.getHostName().equals(hostListEach.getHostName()))) {
                hostListWithoutDuplicate.add(hostListEach);
            }
        }

        return hostListWithoutDuplicate;
    }
}

package com.ssafy.backend.api.controller;

import com.ssafy.backend.api.dto.response.HostListRes;
import com.ssafy.backend.api.dto.response.HostSearchRes;
import com.ssafy.backend.api.dto.response.HostStateRes;
import com.ssafy.backend.api.dto.response.HostTagRes;
import com.ssafy.backend.api.service.HostService;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/host")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Api(value = "Host 조회", tags = "Host")
public class HostController {

    private final HostService hostService;

    @Autowired
    public HostController(HostService hostService) {
        this.hostService = hostService;
    }

    @GetMapping("/search")
    @Operation(summary = "Host 검색 반환 API", description = "Collection threaddump 내 Host 검색 결과 반환")
    public HostSearchRes showHostSearch(
            @RequestParam(required = false, defaultValue = "") String startAt,
            @RequestParam(required = false, defaultValue = "") String endAt,
            @RequestParam(required = false, defaultValue = "") String query) {

        return hostService.getHostSearch(startAt, endAt, query);
    }

    @GetMapping("/list")
    @Operation(summary = "Host List 검색", description = "Collection threaddump 내 Host List를 cluster & tag로 검색")
    public HostListRes showHostList(
            @RequestParam String startAt,
            @RequestParam String endAt,
            @RequestParam(required = false, defaultValue = "") String cluster,
            @RequestParam(required = false, defaultValue = "") String tags) {

        return hostService.getHostList(startAt, endAt, cluster, tags);
    }

    @GetMapping("/state")
    @Operation(summary = "각 Host 정보 반환", description = "Collection threaddump 내 Host정보를 Host이름 & 시각 별로 반환")
    public HostStateRes showHostState(
            @RequestParam String host,
            @RequestParam String time ) {

        return hostService.getHostState(host, time);
    }

    @GetMapping("/tag")
    @Operation(summary = "Tag 목록 반환", description = "Collection threaddump 내 특정 기간 내 모든 Tag 목록 반환")
    public HostTagRes showHostTag(@RequestParam String startAt, @RequestParam String endAt) {

        return hostService.getHostTag(startAt, endAt);
    }
}

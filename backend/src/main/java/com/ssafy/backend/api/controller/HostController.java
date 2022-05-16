package com.ssafy.backend.api.controller;

import com.ssafy.backend.api.dto.response.HostListRes;
import com.ssafy.backend.api.dto.response.HostSearchRes;
import com.ssafy.backend.api.dto.response.HostStateRes;
import com.ssafy.backend.api.dto.response.HostTagRes;
import com.ssafy.backend.api.service.HostService;
import com.ssafy.backend.core.domain.HostTag;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Page Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @Operation(summary = "Host 검색 반환 API", description = "Collection threaddump 내 Host 검색 결과 반환")
    public ResponseEntity<HostSearchRes> showHostSearch(
            @RequestParam(required = false, defaultValue = "") String startAt,
            @RequestParam(required = false, defaultValue = "") String endAt,
            @RequestParam(required = false, defaultValue = "") String query) {
        HostSearchRes hostSearch = hostService.getHostSearch(startAt, endAt, query);

        return ResponseEntity.ok(hostSearch);
//        return ResponseEntity.status(200).body(hostList);
    }

    @GetMapping("/list")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Page Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @Operation(summary = "Host List 검색", description = "Collection threaddump 내 Host List를 cluster & tag로 검색")
    public ResponseEntity<HostListRes> showHostList(
            @RequestParam String startAt,
            @RequestParam String endAt,
            @RequestParam(required = false, defaultValue = "") String cluster,
            @RequestParam(required = false, defaultValue = "") String tags) {
        HostListRes hostListRes = hostService.getHostList(startAt, endAt, cluster, tags);

        return ResponseEntity.ok(hostListRes);
    }

    @GetMapping("/state")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Page Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @Operation(summary = "각 Host 정보 반환", description = "Collection threaddump 내 Host정보를 _id별로 반환")
    public ResponseEntity<HostStateRes> showHostState( @RequestParam String _id ) {
        HostStateRes hostStateRes = hostService.getHostState(_id);

        return ResponseEntity.ok(hostStateRes);
    }

    @GetMapping("/tag")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Page Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @Operation(summary = "Tag 목록 반환", description = "Collection threaddump 내 특정 기간 내 모든 Tag 목록 반환")
    public ResponseEntity<HostTagRes> showHostTag(@RequestParam String startAt, @RequestParam String endAt) {
        HostTagRes hostTagRes = hostService.getHostTag(startAt, endAt);

        return ResponseEntity.ok(hostTagRes);
    }
}

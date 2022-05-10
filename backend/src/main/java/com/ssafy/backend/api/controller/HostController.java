package com.ssafy.backend.api.controller;

import com.ssafy.backend.api.dto.response.HostListRes;
import com.ssafy.backend.api.service.HostService;
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
    public ResponseEntity<HostListRes> showHostSearch(
            @RequestParam(required = false, defaultValue = "") String startAt,
            @RequestParam(required = false, defaultValue = "") String endAt,
            @RequestParam(required = false, defaultValue = "") String query) {
        HostListRes hostList = hostService.getHostSearch(startAt, endAt, query);

        return ResponseEntity.ok(hostList);
//        return ResponseEntity.status(200).body(hostList);
    }
}

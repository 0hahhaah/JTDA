package com.ssafy.backend.api.controller;

import com.ssafy.backend.api.service.TestService;
import com.ssafy.backend.core.domain.Test;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/test")
@Api(value = "테스트용 API", tags = "테스트용 API")
public class TestController {

    @Autowired
    private TestService testService;

    @GetMapping
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Page Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @Operation(summary = "테스트 리스트 반환 API", description = "Collection logsTest의 모든 test항목을 반환")
    public ResponseEntity<List<Test>> showTestList() {
        List<Test> responseDto = testService.getTestList();
        return ResponseEntity.status(200).body(responseDto);
    }
}

package com.ssafy.backend.api.controller;



import com.ssafy.backend.api.dto.response.ThreadStateDetailDto;
import com.ssafy.backend.api.dto.response.ThreadStateListDto;
import com.ssafy.backend.api.service.ThreadStateDetailService;
import com.ssafy.backend.api.service.ThreadStateService;
import com.ssafy.backend.core.domain.ThreadStateList;
import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/thread")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Api(value = "Host 조회", tags = "Host")
public class ThreadController {

    private final ThreadStateService threadStateService;
    private final ThreadStateDetailService threadStateDetailService;

    @Autowired
    public ThreadController(ThreadStateService threadStateService, ThreadStateDetailService threadStateDetailService) {
        this.threadStateService = threadStateService;
        this.threadStateDetailService = threadStateDetailService;
    }

    @GetMapping("/states")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Page Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @Operation(summary = "ThreadStates 를 갖는 Host 리스트 반환 API", description = "Collection threaddump 내 특정 기간 내의 hostIp, hostName, threadState 항목을 반환")
    public ResponseEntity<Map<String, Object>> showThreadstateList(
            @RequestParam List<String> host,
//            @RequestParam List<String> host,
            @RequestParam String startAt,
            @RequestParam String endAt) throws Exception{
        ThreadStateListDto threadStateListDto = threadStateService.getThreadList(host, startAt, endAt);
//        List<ThreadStateList> list = threadStateService.getThreadList(host, startAt, endAt);
        Map<String, Object> response = new HashMap<>();
        response.put("startAt", startAt);
        response.put("endAt", endAt);
//        response.put("hostCount", threadStateListDto.size());
//        response.put("hostList", threadStateListDto);
        response.put("hostList", threadStateListDto);

        return ResponseEntity.status(200).body(response);
    }

    @GetMapping("/detail")
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "OK"),
            @ApiResponse(responseCode = "400", description = "Bad Request"),
            @ApiResponse(responseCode = "404", description = "Page Not Found"),
            @ApiResponse(responseCode = "500", description = "Internal Server Error")
    })
    @Operation(summary = "해당 host 내 특정 state 를 갖는 thread 리스트 반환 API", description = "해당 host 내 특정 state 를 갖는 thread 리스트를 반환")
    public ResponseEntity<Map<String, Object>> showThreadDetail(
            @RequestParam String _id,
            @RequestParam String state) throws Exception{
        ThreadStateDetailDto threadStateDetailDto = threadStateDetailService.getThreadStateDetailList(_id, state);

        Map<String, Object> response = new HashMap<>();
        response.put("threadCount", threadStateDetailDto.getThreadDumps().size());
        response.put("threadStateDetails", threadStateDetailDto);

        return ResponseEntity.status(200).body(response);
    }



}

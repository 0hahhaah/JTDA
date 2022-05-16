package com.ssafy.backend.api.dto.response;

import com.ssafy.backend.core.domain.HostList;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;


@Getter
@Setter
@ApiModel("HostListResponse")
public class HostListRes {

    private String startAt;

    private String endAt;

    private hostListSearchInputRes searchInput;

    private int resultCount;

    private List<HostListResultsRes> results;

    public HostListRes(String startAt, String endAt, hostListSearchInputRes searchInput, int resultCount, List<HostListResultsRes> results) {
        this.startAt = startAt;
        this.endAt = endAt;
        this.searchInput = searchInput;
        this.resultCount = resultCount;
        this.results = results;
    }
}

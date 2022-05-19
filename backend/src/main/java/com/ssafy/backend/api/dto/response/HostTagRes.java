package com.ssafy.backend.api.dto.response;

import com.ssafy.backend.core.domain.HostTag;
import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("HostTagResponse")
public class HostTagRes {

    private List<HostTag> tags;

    public HostTagRes(List<HostTag> tags) {
        this.tags = tags;
    }
}

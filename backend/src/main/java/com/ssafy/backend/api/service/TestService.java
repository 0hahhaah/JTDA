package com.ssafy.backend.api.service;

import com.ssafy.backend.core.domain.Test;
import org.springframework.stereotype.Service;

import java.util.List;

public interface TestService {

    List<Test> getTestList();
}

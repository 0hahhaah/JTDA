package com.ssafy.backend.api.queryrepository;

import com.ssafy.backend.core.domain.Test;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TestRepository {
    List<Test> findNewsList();
}

package com.ssafy.backend.api.queryrepository;

import com.ssafy.backend.core.domain.Test;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TestRepository {
    List<Test> findNewsList();
}

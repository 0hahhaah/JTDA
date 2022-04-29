package com.ssafy.backend.core.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "logsTest")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Test {

    @Id
    private ObjectId _id;

    private String test;

    protected Test(String test) {
        this.test = test;
    }
}

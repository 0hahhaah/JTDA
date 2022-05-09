FROM openjdk:8-jdk-alpine

ARG AGENT_FILE=jvm-thread-dump-agent-1.0-SNAPSHOT.jar TEST_FILE=thread-dump-producer-1.0-SNAPSHOT.jar

WORKDIR /app

COPY ${AGENT_FILE} agent.jar
COPY ${TEST_FILE} thread-test.jar

ENTRYPOINT ["java","-javaagent:agent.jar=debug,threshold=1000,delay=5000,interval=300000,topic=json_log","-jar","thread-test.jar"]

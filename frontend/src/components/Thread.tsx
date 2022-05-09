import { useState } from "react";
import styled from "styled-components";
import { dummyThreadLog } from "../data/dummy";

const Container = styled.div`
  padding: 30px;
`;

const Title = styled.h1`
  margin: 50px 0px 0px 50px;
`;

const SubTitle = styled.h2`
  color: rgb(107, 114, 128);
  margin: 0px 0px 0px 50px;
`;

const Box = styled.div`
  text-align: left;
  margin: 20px 50px;
  padding: 10px;
  border: 2px solid #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

const ThreadName = styled.h2`
  margin: 10px;
  font-size: 1.5rem;
  font-weight: 600;
  color: red;
  text-align: left;
`;

const ThreadInfos = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 10px;
  gap: 10px;
`;

const ThreadInfo = styled.p`
  margin: 0px;
  grid-column: span 1 / span 2;
  font-size: 1rem;
  font-weight: 500;
  color: rgb(107, 114, 128);
`;

const StackTrace = styled.div`
  margin: 10px;
  font-size: 0.875rem;
`;

const LineText = styled.p`
  margin: 0px;
  white-space: pre-wrap;
`;

export default function Thread() {
  const [threadLog, setThreadLog] = useState(dummyThreadLog);

  const paintThreadLog: JSX.Element[] = dummyThreadLog.threadDumps.map(
    (threadDump, idx) => {
      return (
        <Box key={idx} id={threadDump.id}>
          <ThreadName>{threadDump.name}</ThreadName>
          <ThreadInfos>
            <ThreadInfo>{`THREAD ID (DECIMAL): ${threadDump.id}`}</ThreadInfo>
            <ThreadInfo>{`THREAD ID (HASH): ${threadDump.hashId}`}</ThreadInfo>
            <ThreadInfo>
              {`IS DEAMON: ${threadDump.isDaemon ? true : false}`}
            </ThreadInfo>
            <ThreadInfo>{`PRIORITY: ${threadDump.priority}`}</ThreadInfo>
            <ThreadInfo>{`STATE: ${threadDump.state}`}</ThreadInfo>
          </ThreadInfos>
          <StackTrace>
            {`stackTrace:`}
            <br />
            {`java.lang.Thread.State: ${threadDump.state}`}
            <br />
            {paintStringArray(threadDump.stackTrace)}
          </StackTrace>
          {paintStringArray(threadDump.lockedOwnableSynchronizers)}
        </Box>
      );
    }
  );

  function paintStringArray(stringArray: string[]): JSX.Element[] {
    return stringArray.map((stringElement, idx) => (
      <LineText key={idx}>
        {stringElement}
        <br></br>
      </LineText>
    ));
  }

  return (
    <Container>
      <Title>{`${dummyThreadLog.hostIp}@${dummyThreadLog.hostName}`}</Title>
      <SubTitle>{`${"WAITING"}`}</SubTitle>
      <SubTitle>{`${dummyThreadLog.logTime}`}</SubTitle>
      {paintThreadLog}
    </Container>
  );
}

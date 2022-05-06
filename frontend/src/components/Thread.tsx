import { useState } from "react";
import styled from "styled-components";
import { dummyThreadLog } from "../data/dummy";

const Detail = styled.h1`
  margin-top: 50px;
`;

const Box = styled.div`
  margin: 50px 50px;
  border: 1px solid gray;
  text-align: left;
`;

const ThreadName = styled.div`
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

const ThreadInfo = styled.div`
  grid-column: span 1 / span 2;
  font-size: 1rem;
  font-weight: 500;
  color: rgb(107, 114, 128);
`;

const StackTrace = styled.div`
  margin: 10px;
  font-size: 0.875rem;
`;

const LineText = styled.div`
  white-space: pre-wrap;
`;

export default function Thread() {
  const [threadLog, setThreadLog] = useState(dummyThreadLog);

  const paintThreadLog: JSX.Element[] = dummyThreadLog.threadDumps.map(
    (threadDump, idx) => {
      return (
        <Box>
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
            {`java.lang.Thread.State: ${threadDump.state}`}
            <br></br>
            {paintStringArray(threadDump.stackTrace)}
          </StackTrace>
          {paintStringArray(threadDump.lockedOwnableSynchronizers)}
        </Box>
      );
    }
  );

  function paintStringArray(stringArray: string[]): JSX.Element[] {
    return stringArray.map((stringElement, idx) => (
      <LineText>
        {stringElement}
        <br></br>
      </LineText>
    ));
  }

  return (
    <>
      <Detail>Waiting</Detail>
      {paintThreadLog}
      {/* <Box>
        <Title>
          <h3>java.lang.Thread.State: BLOCKED (on object monitor)</h3>
        </Title>
        <Content>
          at
          com.nbp.theplatform.threaddump.ThreadDeadLockState$DeadlockThread.goMonitorDeadlock(ThreadDeadLockState.java:197)
          - waiting to lock (a
          com.nbp.theplatform.threaddump.ThreadDeadLockState$Monitor) at
          com.nbp.theplatform.threaddump.ThreadDeadLockState$DeadlockThread.monitorOurLock(ThreadDeadLockState.java:182)
          - locked (a
          com.nbp.theplatform.threaddump.ThreadDeadLockState$Monitor) at
          com.nbp.theplatform.threaddump.ThreadDeadLockState$DeadlockThread.run(ThreadDeadLockState.java:135)
        </Content>
      </Box>
      <Box>
        <Title>
          <h3>java.lang.Thread.State: BLOCKED (on object monitor)</h3>
        </Title>
        <Content>
          at
          com.nbp.theplatform.threaddump.ThreadDeadLockState$DeadlockThread.goMonitorDeadlock(ThreadDeadLockState.java:197)
          - waiting to lock (a
          com.nbp.theplatform.threaddump.ThreadDeadLockState$Monitor) at
          com.nbp.theplatform.threaddump.ThreadDeadLockState$DeadlockThread.monitorOurLock(ThreadDeadLockState.java:182)
          - locked (a
          com.nbp.theplatform.threaddump.ThreadDeadLockState$Monitor) at
          com.nbp.theplatform.threaddump.ThreadDeadLockState$DeadlockThread.run(ThreadDeadLockState.java:135)
        </Content>
      </Box>
      <Box>
        <Title>
          <h3>java.lang.Thread.State: BLOCKED (on object monitor)</h3>
        </Title>
        <Content>
          at
          com.nbp.theplatform.threaddump.ThreadDeadLockState$DeadlockThread.goMonitorDeadlock(ThreadDeadLockState.java:197)
          - waiting to lock (a
          com.nbp.theplatform.threaddump.ThreadDeadLockState$Monitor) at
          com.nbp.theplatform.threaddump.ThreadDeadLockState$DeadlockThread.monitorOurLock(ThreadDeadLockState.java:182)
          - locked (a
          com.nbp.theplatform.threaddump.ThreadDeadLockState$Monitor) at
          com.nbp.theplatform.threaddump.ThreadDeadLockState$DeadlockThread.run(ThreadDeadLockState.java:135)
        </Content>
      </Box> */}
    </>
  );
}

// const {
//   id,
//   hashId,
//   name,
//   isDaemon,
//   priority,
//   state,
//   lockOwner,
//   stackTrace,
//   lockedOwnableSynchronizers,
// } = threadDump;

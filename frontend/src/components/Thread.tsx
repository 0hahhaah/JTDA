import styled from "styled-components"

const Detail = styled.h1`
  margin-top: 50px;
`
const Box = styled.div`
  margin: 50px 50px;
  border: 3px solid gray;
  text-align: left;
`
const Title = styled.div`
  margin: 10px;
  font-size: large;
  text-align: left;
`
const Content = styled.div`
  margin: 10px;
  border: 1px solid black;
  font-size: large;
`
export default function Thread() {
  return(
    <>
    <Detail>Waiting</Detail>
    <Box>
      <Title><h3>java.lang.Thread.State: BLOCKED (on object monitor)</h3></Title>
      <Content>
            at com.nbp.theplatform.threaddump.ThreadDeadLockState$DeadlockThread.goMonitorDeadlock(ThreadDeadLockState.java:197)
            - waiting to lock (a com.nbp.theplatform.threaddump.ThreadDeadLockState$Monitor)
            at com.nbp.theplatform.threaddump.ThreadDeadLockState$DeadlockThread.monitorOurLock(ThreadDeadLockState.java:182)
            - locked (a com.nbp.theplatform.threaddump.ThreadDeadLockState$Monitor)
            at com.nbp.theplatform.threaddump.ThreadDeadLockState$DeadlockThread.run(ThreadDeadLockState.java:135)</Content>
    </Box>
    <Box>
      <Title><h3>java.lang.Thread.State: BLOCKED (on object monitor)</h3></Title>
      <Content>
            at com.nbp.theplatform.threaddump.ThreadDeadLockState$DeadlockThread.goMonitorDeadlock(ThreadDeadLockState.java:197)
            - waiting to lock (a com.nbp.theplatform.threaddump.ThreadDeadLockState$Monitor)
            at com.nbp.theplatform.threaddump.ThreadDeadLockState$DeadlockThread.monitorOurLock(ThreadDeadLockState.java:182)
            - locked (a com.nbp.theplatform.threaddump.ThreadDeadLockState$Monitor)
            at com.nbp.theplatform.threaddump.ThreadDeadLockState$DeadlockThread.run(ThreadDeadLockState.java:135)</Content>
    </Box>
    <Box>
      <Title><h3>java.lang.Thread.State: BLOCKED (on object monitor)</h3></Title>
      <Content>
            at com.nbp.theplatform.threaddump.ThreadDeadLockState$DeadlockThread.goMonitorDeadlock(ThreadDeadLockState.java:197)
            - waiting to lock (a com.nbp.theplatform.threaddump.ThreadDeadLockState$Monitor)
            at com.nbp.theplatform.threaddump.ThreadDeadLockState$DeadlockThread.monitorOurLock(ThreadDeadLockState.java:182)
            - locked (a com.nbp.theplatform.threaddump.ThreadDeadLockState$Monitor)
            at com.nbp.theplatform.threaddump.ThreadDeadLockState$DeadlockThread.run(ThreadDeadLockState.java:135)</Content>
    </Box>
    </>
  );
}
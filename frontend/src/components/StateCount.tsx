import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { dummyThread } from "../data/dummy";

declare module "styled-components" {}

const Container = styled.div`
  width: fit-content;
`;

const Title = styled.p`
  margin: 5px 0 5px 10px;
  font-size: 20px;
  text-align: left;
`;

const StateBlock = styled.div`
  display: flex;
  gap: 10px;
  background-color: rgb(254, 240, 138);
`;

const Card = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  height: 120px;
  background-color: lightgray;
`;

const ThreadState = styled.p`
  margin: 0;
  padding: 10px;
  font-size: 14px;
`;

const StateNum = styled.span`
  font-size: 40px;
`;

function StateCount() {
  const navigate = useNavigate();

  // 테스트 용 데이터
  const [hostId, setHostId] = useState<string>("3");
  const [dateTime, setDateTime] = useState<string>("2022-05-06 09:50:30");

  useEffect(() => {
    setThreadInfo(dummyThread);
  }, []);

  const [threadInfo, setThreadInfo] = useState(dummyThread);

  // 코드 중복 제거
  const states = ["BLOCKED", "RUNNABLE", "WAITING", "TIMED_WAITING"];
  const paintCards: JSX.Element[] = states.map((state) => (
    <Card
      onClick={() =>
        navigate(`/detail?state=${state}&host=${hostId}&datetime=${dateTime}`)
      }
    >
      <ThreadState>{state}</ThreadState>
      <StateNum>{threadInfo.threadState[state]}</StateNum>
    </Card>
  ));

  return (
    <Container>
      <Title>
        host {hostId} / {dateTime} Thread State
      </Title>
      <StateBlock>
        <Card>
          <ThreadState>총 Thread 수</ThreadState>
          <StateNum>{threadInfo.count}</StateNum>
        </Card>
        {paintCards}
      </StateBlock>
    </Container>
  );
}

export default StateCount;

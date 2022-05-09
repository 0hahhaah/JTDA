import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { dummyThread } from "../data/dummy";
import { ReactComponent as Lock } from "../assets/lock.svg";
import { ReactComponent as Play } from "../assets/play.svg";
import { ReactComponent as Pause } from "../assets/pause.svg";
import { ReactComponent as Clock } from "../assets/clock.svg";

const Container = styled.div`
  width: fit-content;
`;

const Title = styled.h1`
  text-align: left;
`;

const SubTitle = styled.h2`
  color: rgb(107, 114, 128);
`;

const StateBlock = styled.div`
  display: flex;
  gap: 10px;
`;

const Card = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 200px;
  height: 200px;
  border: 2px solid #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

const ThreadState = styled.div`
  margin: 0;
  padding: 5px;
  font-size: 1.1rem;
  text-align: center;
  width: 80%;
  border-radius: 5px;
  background-color: ${(props) => props.color};
`;

const StateNum = styled.span`
  font-size: 50px;
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

  const paintIcon = (state: string): JSX.Element => {
    switch (state) {
      case "BLOCKED":
        return <Lock width="40" height="40"></Lock>;
      case "RUNNABLE":
        return <Play width="40" height="40"></Play>;
      case "WAITING":
        return <Pause width="40" height="40"></Pause>;
      case "TIMED_WAITING":
        return <Clock width="40" height="40"></Clock>;
    }

    return <></>;
  };

  const handleStateColor = (state: string): string => {
    switch (state) {
      case "BLOCKED":
        return "#F9DFDE";
      case "RUNNABLE":
        return "#E5F5F5";
      case "WAITING":
        return "#F6E9DE";
      case "TIMED_WAITING":
        return "#C4DAEC";
    }
    return "";
  };

  // 코드 중복 제거
  const states = ["BLOCKED", "RUNNABLE", "WAITING", "TIMED_WAITING"];
  const paintCards: JSX.Element[] = states.map((state, idx) => (
    <Card
      key={idx}
      onClick={() =>
        navigate(`/detail?state=${state}&host=${hostId}&datetime=${dateTime}`)
      }
    >
      {paintIcon(state)}
      <StateNum>{threadInfo.threadState[state]}</StateNum>
      <ThreadState color={handleStateColor(state)}>{state}</ThreadState>
    </Card>
  ));

  return (
    <Container>
      <Title>
        Host: {hostId} ({dateTime})
      </Title>
      <SubTitle>Total Thread Count: {threadInfo.count}</SubTitle>
      <StateBlock>
        {/* <Card>
          <ThreadState>총 Thread 수</ThreadState>
          <StateNum>{threadInfo.count}</StateNum>
        </Card> */}
        {paintCards}
      </StateBlock>
    </Container>
  );
}

export default StateCount;

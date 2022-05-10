import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { dummyThread } from "../data/dummy";
import StatePieChart from "./StatePieChart";
import { Boundary } from "../page/main";
import { ReactComponent as Lock } from "../assets/lock.svg";
import { ReactComponent as Play } from "../assets/play.svg";
import { ReactComponent as Pause } from "../assets/pause.svg";
import { ReactComponent as Clock } from "../assets/clock.svg";
import BlockingGraph from "./BlockingGraph";

const Shadow = styled.div`
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

const Section = styled(Shadow)`
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 10px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  margin-bottom: 100px;
`;

const Title = styled.h1`
  color: #333333;
  font-weight: 600;
  margin: 0px;
  text-align: left;
`;

const SubTitle = styled.h2`
  color: #999999;
  font-weight: 400;
  margin: 0px;
  color: rgb(107, 114, 128);
`;

const CardContainer = styled.div<{ gridCol: number }>`
  margin: 20px 20px 0px 0px;
  display: grid;
  grid-template-columns: repeat(${(props) => props.gridCol}, minmax(0, 1fr));
  gap: 10px;
`;

const Card = styled(Shadow)`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  min-width: 200px;
  min-height: 200px;
  border: 2px solid #f7f7f7;
  border-radius: 10px;

  grid-column: span 1 / span 1;
  @media (max-width: 1280px) {
    grid-column: span 2 / span 4;
  }
`;

const ThreadState = styled.div<{ color?: string }>`
  margin: 0;
  padding: 5px;
  font-size: 1.2rem;
  font-weight: 400;
  white-space: nowrap;
  color: #333333;
  text-align: center;
  width: 80%;
  border-radius: 5px;
  background-color: ${(props) => props.color};
`;

const StateNum = styled.span`
  font-size: 3.5rem;
  font-weight: 400;
`;

export const handleStateColor = (state: string): string => {
  switch (state) {
    case "RUNNABLE":
      return "rgb(0, 215, 199, 0.5)";
    case "BLOCKED":
      return "rgb(228, 59, 94, 0.5)";
    case "WAITING":
      return "rgb(255, 124, 75, 0.5)";
    case "TIMED_WAITING":
      return "rgb(0, 151, 225, 0.5)";
  }
  return "";
};

export default function ThreadSummary() {
  const navigate = useNavigate();

  // 테스트 용 데이터
  const [hostId, setHostId] = useState<string>("3");
  const [dateTime, setDateTime] = useState<string>("2022-05-06 09:50:30");

  const [threadInfo, setThreadInfo] = useState(dummyThread);

  const paintIcon = (state: string): JSX.Element => {
    switch (state) {
      case "RUNNABLE":
        return <Play width="40" height="40"></Play>;
      case "BLOCKED":
        return <Lock width="40" height="40"></Lock>;
      case "WAITING":
        return <Pause width="40" height="40"></Pause>;
      case "TIMED_WAITING":
        return <Clock width="40" height="40"></Clock>;
    }

    return <></>;
  };

  // 코드 중복 제거
  const states = ["RUNNABLE", "BLOCKED", "WAITING", "TIMED_WAITING"];
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
    <Section>
      <Title>host {hostId}</Title>
      <SubTitle>{dateTime}</SubTitle>
      <SubTitle>Total Thread Count: {threadInfo.count}</SubTitle>
      <Container>
        <CardContainer gridCol={4}>{paintCards}</CardContainer>
        <StatePieChart threadInfo={threadInfo} />
      </Container>
      <Boundary />
      <SubTitle>Daemon Count</SubTitle>
      <Container>
        <CardContainer gridCol={2}>
          <Card>Daemon</Card>
          <Card>Non-Daemon</Card>
        </CardContainer>
      </Container>
      <Boundary />
      <SubTitle>Blocking Infos</SubTitle>
      <Container>
        <BlockingGraph></BlockingGraph>
      </Container>
    </Section>
  );
}

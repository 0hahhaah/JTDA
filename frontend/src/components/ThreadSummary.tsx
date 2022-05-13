import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { dummyThread } from "../data/dummy";
import StatePieChart from "./StatePieChart";
import { Boundary } from "../page/main";
import { ReactComponent as Lock } from "../assets/lock.svg";
import { ReactComponent as Play } from "../assets/play.svg";
import { ReactComponent as Pause } from "../assets/pause.svg";
import { ReactComponent as Clock } from "../assets/clock.svg";
import BlockingGraph from "./BlockingGraph";
import axios, { AxiosResponse } from "axios";
import { HostSummary } from "../interfaces/HostInfo.interface";

const Shadow = styled.div`
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

const Container = styled(Shadow)`
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 10px;
`;

const Section = styled.div`
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
  const dummyData: string[] = [
    "627db1df02a6425b513b9f5b",
    "627db1ec02a6425b513b9f61",
    "627db1f802a6425b513b9f68",
  ];
  const [selectedIds, setSelectedIds] = useState<string[]>(dummyData);
  const [hostSummaryArray, setSummaryArray] = useState<HostSummary[]>([]);
  useEffect(() => {
    const fetchAndSetSummaryArray = async () => {
      const BASE_URL: string = `https://k6s102.p.ssafy.io/api`;
      const requestURL: string =
        BASE_URL + `/host/state?_id=${selectedIds.join()}`;
      const res = await axios.get(requestURL);

      setSummaryArray(res.data.hosts);
    };

    fetchAndSetSummaryArray();
  }, [selectedIds]);

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
  const paintCards = (hostSummary: HostSummary): JSX.Element[] => {
    return states.map((state, idx) => (
      <Card
        key={idx}
        onClick={() => navigate(`/detail?state=${state}&id=${hostSummary._id}`)}
      >
        {paintIcon(state)}
        <StateNum>{hostSummary.threadStateCount[state]}</StateNum>
        <ThreadState color={handleStateColor(state)}>{state}</ThreadState>
      </Card>
    ));
  };

  const paintContainers: JSX.Element[] = hostSummaryArray?.map(
    (hostSummary) => (
      <Container>
        <Title>host {hostSummary.host}</Title>
        <SubTitle>{hostSummary.logTime}</SubTitle>
        <SubTitle>Total Thread Count: {hostSummary.threadCount}</SubTitle>
        <Section>
          <CardContainer gridCol={4}>{paintCards(hostSummary)}</CardContainer>
          <StatePieChart threadStateCount={hostSummary.threadStateCount} />
        </Section>
        <Boundary />
        <SubTitle>Daemon Count</SubTitle>
        <Section>
          <CardContainer gridCol={2}>
            <Card>Daemon</Card>
            <Card>Non-Daemon</Card>
          </CardContainer>
        </Section>
        {/* <Boundary />
        <SubTitle>Blocking Infos</SubTitle>
        <Container>
          <BlockingGraph></BlockingGraph>
        </Container> */}
      </Container>
    )
  );

  return <Container>{paintContainers}</Container>;
}

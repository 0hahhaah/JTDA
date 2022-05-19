import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import StatePieChart from "./StatePieChart";
import { Boundary } from "../page/main";
import { ReactComponent as Lock } from "../assets/lock.svg";
import { ReactComponent as Play } from "../assets/play.svg";
import { ReactComponent as Pause } from "../assets/pause.svg";
import { ReactComponent as Clock } from "../assets/clock.svg";
import { ReactComponent as ExpandMore } from "../assets/expand_more.svg";
import { ReactComponent as OpenInNew } from "../assets/open_in_new.svg";
import { HostSummary } from "../interfaces/HostInfo.interface";
import { URL } from "../api";

const OpenInNewCustom = styled(OpenInNew)`
  margin-top: 5px;
`;

const Shadow = styled.div`
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
`;

const Container = styled(Shadow)`
  display: flex;
  flex-direction: column;
  width: 80%;
  padding: 30px;
  border-radius: 10px;
`;
//   background-color: #60008010;

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin-bottom: 50px;
`;

const PreviewBox = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div``;
const Summary = styled.div`
  display: flex;
  gap: 10px;
`;

const ToggleBox = styled.div<{ active?: boolean }>`
  overflow: hidden;
  transition: all 0.5s ease-in-out;
  height: ${(props) => (props.active ? "450px" : "0px")};

  border-radius: 10px;
  background-color: white;

  @media (max-width: 1760px) {
    height: ${(props) => (props.active ? "600px" : "0px")};
`;

const Title = styled.h1`
  color: #333333;
  font-weight: 600;
  margin: 0px;
  text-align: left;
  cursor: pointer;
  display: flex;
  width: fit-content;
`;

const SubTitle = styled.h2`
  color: #999999;
  font-weight: 400;
  margin: 0px;
  color: rgb(107, 114, 128);
  display: inline-block;
`;

const CardContainer = styled.div<{ gridCol: number }>`
  margin: 20px 20px 0px 0px;
  display: grid;
  grid-template-columns: repeat(${(props) => props.gridCol}, minmax(0, 1fr));
  gap: 10px;
`;

const Card = styled(Shadow)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  border: 2px solid #f7f7f7;
  border-radius: 10px;
`;

const DetailCard = styled(Card)`
  cursor: pointer;
  min-width: 200px;
  min-height: 200px;

  grid-column: span 1 / span 1;
  @media (max-width: 1760px) {
    grid-column: span 2 / span 4;
  }
`;

const PreviewCard = styled(Card)`
  min-width: 100px;
  min-height: 100px;
`;

const ThreadState = styled.div<{ color?: string; size?: string }>`
  margin: 0;
  padding: 5px;
  font-size: ${(props) => props.size || "1.2rem"};
  font-weight: 400;
  white-space: nowrap;
  color: #333333;
  text-align: center;
  width: 80%;
  border-radius: 5px;
  background-color: ${(props) => props.color};
`;

const StateNum = styled.span<{ size?: string }>`
  font-size: ${(props) => props.size || "3.5rem"};
  font-weight: 400;
`;

const LinkButton = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    color: black;
    text-decoration-line: underline;
    text-underline-offset: 4px;
  }
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

interface ThreadSummaryProps {
  selectedTime: string;
  selectedHostNames: string[];
}

export default function ThreadSummary({
  selectedTime,
  selectedHostNames,
}: ThreadSummaryProps) {
  const navigate = useNavigate();

  const [showDetail, setShowDetail] = useState<boolean[]>([]);
  const [hostSummaryArray, setSummaryArray] = useState<HostSummary[]>([]);
  useEffect(() => {
    const fetchAndSetSummaryArray = async () => {
      const requestURL: string =
        URL +
        `/api/host/state?host=${selectedHostNames.join()}&time=${selectedTime}`;
      const res = await axios.get(requestURL);

      setSummaryArray(res.data.hosts);
      setShowDetail(new Array(res.data.hosts.length).fill(false));
    };

    if (selectedTime) {
      fetchAndSetSummaryArray();
    }
  }, [selectedTime, selectedHostNames]);

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

  const threadStates = ["RUNNABLE", "BLOCKED", "WAITING", "TIMED_WAITING"];
  const paintCards = (
    hostSummary: HostSummary,
    isPreview: boolean = false
  ): JSX.Element[] | JSX.Element => {
    if (isPreview && hostSummary.threadStateCount) {
      return threadStates.map((state, idx) => (
        <PreviewCard key={idx}>
          {paintIcon(state)}
          <StateNum size="1.75rem">
            {hostSummary.threadStateCount[state]}
          </StateNum>
          {/* <ThreadState size="1rem" color={handleStateColor(state)}>
            {state}
          </ThreadState> */}
        </PreviewCard>
      ));
    }

    if (hostSummary.threadStateCount) {
      return threadStates.map((state, idx) => (
        <DetailCard
          key={idx}
          onClick={() => {
            window.open(
              `/detail?state=${state}&id=${hostSummary._id}`,
              "_blank"
            );
          }}
        >
          {paintIcon(state)}
          <StateNum>{hostSummary.threadStateCount[state]}</StateNum>
          <ThreadState color={handleStateColor(state)}>{state}</ThreadState>
        </DetailCard>
      ));
    } else {
      return <div>요청하신 데이터가 없습니다.</div>;
    }
  };

  const handleToggleClick = (idx: number): void => {
    setShowDetail((state): boolean[] => {
      const newState: boolean[] = [...state];
      newState[idx] = !state[idx];

      return newState;
    });
  };

  const paintContainers: JSX.Element[] = hostSummaryArray?.map(
    (hostSummary, idx) => (
      <Container key={idx}>
        <PreviewBox>
          <Info>
            <Title onClick={() => handleToggleClick(idx)}>
              {hostSummary.host}{" "}
              <ExpandMore
                style={{
                  transform: `rotate(${showDetail[idx] ? "-180" : "0"}deg)`,
                  transition: "all 500ms ease",
                }}
              />
            </Title>
            <SubTitle>{hostSummary.logTime}</SubTitle>
          </Info>
          {!showDetail[idx] && (
            <Summary>{paintCards(hostSummary, true)}</Summary>
          )}
        </PreviewBox>
        <ToggleBox id={idx.toString()} active={showDetail[idx]}>
          <SubTitle>
            <LinkButton
              onClick={() => {
                window.open(`/detail?id=${hostSummary._id}`, "_blank");
              }}
            >
              <OpenInNewCustom></OpenInNewCustom>
              Total Thread Count: {hostSummary.threadCount}
            </LinkButton>
            {`daemon: ${hostSummary.daemonCount} / non-damon: ${hostSummary.nonDaemonCount}`}
          </SubTitle>
          <Section>
            <CardContainer gridCol={4}>{paintCards(hostSummary)}</CardContainer>
            <StatePieChart threadStateCount={hostSummary.threadStateCount} />
          </Section>
        </ToggleBox>
      </Container>
    )
  );

  if (!hostSummaryArray.length) {
    return <>차트에서 특정 시점을 선택해주세요.</>;
  }

  return <>{paintContainers}</>;
}

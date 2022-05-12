import * as React from "react";

import styled from "styled-components";
import SideBar from "../components/SideBar";
import TimeBar from "../components/TimeBar";
import ThreadSummary from "../components/ThreadSummary";
import StateAreaChart from "../components/StateAreaChart";

const Time = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SelectedState = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 40px 20px;
`;

export const Boundary = styled.hr`
  width: 95%;
  border: solid 1px #eeeeee;
`;

export default function Main() {
  const [startAt, setStartAt] = React.useState<Date | null>(new Date());
  const [endAt, setEndAt] = React.useState<Date | null>(new Date());

  return (
    <div>
      <SideBar />
      <Time>
        <TimeBar
          startAt={startAt}
          endAt={endAt}
          setStartAt={setStartAt}
          setEndAt={setEndAt}
        />
        <StateAreaChart />
      </Time>
      <Boundary />
      <SelectedState>
        <ThreadSummary />
      </SelectedState>
    </div>
  );
}

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
  flex-direction: column;
  align-items: center;
  margin: 40px 20px;
`;

export const Boundary = styled.hr`
  width: 95%;
  border: solid 1px #eeeeee;
  margin-bottom: 30px;
`;

export default function Main() {
  const [pointAt, setPointAt] = React.useState<Date | null>(new Date());
  const [startAt, setStartAt] = React.useState<Date | null>(null);
  const [endAt, setEndAt] = React.useState<Date | null>(null);
  const [category, setCategory] = React.useState<string>("point");
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);
  const [selectedHostNames, setSelectedHostNames] = React.useState<string[]>([]);

  return (
    <div>
      <SideBar 
        pointAt={pointAt}
        startAt={startAt} 
        endAt={endAt}
        category={category}
        />
      <Time>
        <TimeBar
          pointAt={pointAt}
          startAt={startAt}
          endAt={endAt}
          category={category}
          setPointAt={setPointAt}
          setStartAt={setStartAt}
          setEndAt={setEndAt}
          setCategory={setCategory}
        />
        <StateAreaChart
          pointAt={pointAt}
          startAt={startAt}
          endAt={endAt}
          category={category}
          setSelectedIds={setSelectedIds}
        />
      </Time>
      <Boundary />
      <SelectedState>
        <ThreadSummary selectedIds={selectedIds} />
      </SelectedState>
    </div>
  );
}

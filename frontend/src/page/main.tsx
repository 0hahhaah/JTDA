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
  const [pointAt, setPointAt] = React.useState<Date | null>(new Date());
  const [startAt, setStartAt] = React.useState<Date | null>(null);
  const [endAt, setEndAt] = React.useState<Date | null>(null);
  const [category, setCategory] = React.useState<string>("point");
  const [selectedIds, setSelectedIds] = React.useState<any>([]);

  return (
    <div>
      <SideBar startAt={startAt} endAt={endAt} />
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
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
        />
      </Time>
      <Boundary />
      <SelectedState>
        <ThreadSummary />
      </SelectedState>
    </div>
  );
}

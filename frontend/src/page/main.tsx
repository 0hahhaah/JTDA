import styled from "styled-components";
import SideBar from "../components/SideBar";
import TimeBar from "../components/TimeBar";
import TimeChart from "../components/TimeChart";
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

export default function main() {
  return (
    <div>
      <SideBar />
      <Time>
        <TimeBar />
        {/* <TimeChart /> */}
        <StateAreaChart />
      </Time>
      <Boundary />
      <SelectedState>
        <ThreadSummary />
      </SelectedState>
    </div>
  );
}

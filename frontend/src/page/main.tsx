import styled from "styled-components";
import SideBar from "../components/SideBar";
import TimeBar from "../components/TimeBar";
import TimeChart from "../components/TimeChart";
import StateCount from "../components/StateCount";

const Time = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: orange;
`;

const SelectedState = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 40px 20px;
`;

export default function main() {
  return (
    <div>
      <SideBar />
      <Time>
        <TimeBar />
        <TimeChart />
      </Time>

      <SelectedState>
        <StateCount />
      </SelectedState>
    </div>
  );
}

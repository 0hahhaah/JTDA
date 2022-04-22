import styled from "styled-components"
import SideBar from "../components/SideBar"
import TimeBar from "../components/TimeBar"
import TimeChart from "../components/TimeChart"

const Time = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: orange;
`


export default function main () {
  return (
    <div>
      <SideBar/>
      <Time>
        <TimeBar/>
        <TimeChart/>
      </Time>

    </div>
  )
}
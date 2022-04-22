import styled from "styled-components"
import RangeSlider from "./RangeSlider"

const Box = styled.div`
  display: flex;
  width: 100%;
  padding: 50px 50px 20px 50px ;
  background-color: beige;
  width: 80%;
`
const Content = styled.div`
  display: flex;
  background-color: yellow;
  width: 60%;
`
const StyledSpan = styled.div`
  margin: 0px 20px;
`
export default function TimeBar() {

  return(
    <Box>
      <Content>
        
        <input type="date"  value="2021-04-22"/>
        <input type="time" /> 
       
        <StyledSpan> ~</StyledSpan>
        <input type="date" value="2021-04-22"/>
        <input type="time"  />
      </Content>
      <RangeSlider></RangeSlider>
    </Box>
  )
}
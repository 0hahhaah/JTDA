import * as React from 'react';
import styled from "styled-components"
import Slider from '@mui/material/Slider';

const TimeSlider = styled.div`
  background-color: red;
  width: 80%;
`
function valuetext(value: number) {
  return `${value}`;
}

export default function RangeSlider() {
  const [value, setValue] = React.useState<number[]>([20, 37]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  return(
    <TimeSlider>
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </TimeSlider>

  )
}
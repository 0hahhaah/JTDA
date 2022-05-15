import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import styled from "styled-components";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

const Box = styled.div`
  background-color: #f7f7f7;
  width: 90%;
  margin: 30px;
`;

const Wave = styled.h2`
  padding: 0px 20px;
`;

const Content = styled.div`
  padding: 0px 20px;
  margin: 10px 0px;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  margin: 20px 30px 20px 10px;
`;

const RadioLabel = styled.label`
  border: 2px solid #5f0080;
  color: white;
  padding: 10px;
  border-radius: 3px;
  width: 3px;
  height: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadioLabelPoint = styled(RadioLabel)`
  background-color: ${(props) =>
    props.color === "point" ? "#5f0080" : "white"};
`;

const RadioLabelRange = styled(RadioLabel)`
  background-color: ${(props) =>
    props.color === "range" ? "#5f0080" : "white"};
`;

const RadioBtn = styled.input`
  display: none;
`;

interface propsType {
  pointAt: Date | null;
  startAt: Date | null;
  endAt: Date | null;
  category: string;
  setPointAt: React.Dispatch<React.SetStateAction<Date | null>>;
  setStartAt: React.Dispatch<React.SetStateAction<Date | null>>;
  setEndAt: React.Dispatch<React.SetStateAction<Date | null>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export default function TimeBar(props: propsType) {
  const handleClickRadioButton = (btn: string) => {
    props.setCategory(btn);
  };

  const changeForm = (now: Date) => {
    const utcNow = now.getTime() + now.getTimezoneOffset() * 60 * 1000; // 현재 시간을 utc로 변환한 밀리세컨드값
    const koreaTimeDiff = 9 * 60 * 60 * 1000; // 한국 시간은 UTC보다 9시간 빠름(9시간의 밀리세컨드 표현)
    const koreaNow = new Date(utcNow + koreaTimeDiff);
    return koreaNow;
  };

  const changeRange = (newValue: Date | null) => {
    // 종료시각 선택 안됐거나 / 시작시간이 종료시간보다 늦은 경우
    if (props.endAt === undefined) {
      props.setEndAt(null);
    } else if (
      props.endAt != null &&
      newValue != null &&
      newValue >= props.endAt
    ) {
      props.setEndAt(null);
    }

    if (newValue === null) {
      props.setStartAt(newValue);
    } else {
      props.setStartAt(changeForm(newValue));
    }
  };

  return (
    <Box>
      <Content>
        <RadioBtn
          type="radio"
          id="point"
          checked={props.category === "point"}
          onChange={() => handleClickRadioButton("point")}
        />
        <RadioLabelPoint htmlFor="point" color={`${props.category}`}>
          <span> ✔</span>
        </RadioLabelPoint>
        <Title>시점 조회</Title>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {props.category === "point" ? (
            <DateTimePicker
              inputFormat="yyyy/MM/dd hh:mm a"
              mask="___/__/__ __:__ _M"
              renderInput={(props) => <TextField {...props} />}
              value={props.pointAt}
              maxDateTime={new Date()}
              onChange={(newValue) => {
                if (newValue === null) {
                  props.setPointAt(newValue);
                } else {
                  props.setPointAt(changeForm(newValue));
                }
              }}
            />
          ) : (
            <DateTimePicker
              disabled
              inputFormat="yyyy/MM/dd hh:mm a"
              mask="___/__/__ __:__ _M"
              renderInput={(props) => <TextField {...props} />}
              value={props.pointAt}
              maxDateTime={new Date()}
              onChange={(newValue) => {
                props.setPointAt(newValue);
              }}
            />
          )}
        </LocalizationProvider>
      </Content>

      <Content>
        <RadioBtn
          type="radio"
          id="range"
          checked={props.category === "range"}
          onChange={() => handleClickRadioButton("range")}
        />
        <RadioLabelRange htmlFor="range" color={`${props.category}`}>
          <span> ✔</span>
        </RadioLabelRange>
        <Title>기간 조회</Title>
        {props.category === "range" ? (
          <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Start"
                inputFormat="yyyy/MM/dd hh:mm a"
                mask="___/__/__ __:__ _M"
                renderInput={(props) => <TextField {...props} />}
                value={props.startAt}
                maxDateTime={new Date()}
                onChange={(newValue) => changeRange(newValue)}
              />
            </LocalizationProvider>
            <Wave> ~ </Wave>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="End"
                inputFormat="yyyy/MM/dd hh:mm a"
                mask="___/__/__ __:__ _M"
                renderInput={(props) => <TextField {...props} />}
                value={props.endAt}
                minDateTime={props.startAt}
                maxDateTime={new Date()}
                onChange={(newValue) => {
                  if (newValue === null) {
                    props.setEndAt(newValue);
                  } else {
                    props.setEndAt(changeForm(newValue));
                  }
                }}
              />
            </LocalizationProvider>
          </>
        ) : (
          <>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                disabled
                label="Start"
                inputFormat="yyyy/MM/dd hh:mm a"
                mask="___/__/__ __:__ _M"
                renderInput={(props) => <TextField {...props} />}
                value={props.startAt}
                maxDateTime={new Date()}
                onChange={(newValue) => changeRange(newValue)}
              />
            </LocalizationProvider>
            <Wave> ~ </Wave>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                disabled
                label="End"
                inputFormat="yyyy/MM/dd hh:mm a"
                mask="___/__/__ __:__ _M"
                renderInput={(props) => <TextField {...props} />}
                value={props.endAt}
                minDateTime={props.startAt}
                maxDateTime={new Date()}
                onChange={(newValue) => {
                  props.setEndAt(newValue);
                }}
              />
            </LocalizationProvider>
          </>
        )}
      </Content>
    </Box>
  );
}

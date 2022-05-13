import * as React from "react";
import axios from "axios";
import { URL } from "../api/index";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { getDatesInRange } from "../utils/formatter";
import { PointElementProp } from "../interfaces/ChartJS.interface";
import { PropsType } from "../interfaces/ChartJS.interface";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin
);

const Box = styled.div`
  padding: 40px 20px;
  width: 80%;
`;

export default function StateAreaChart(props: PropsType) {
  const [dateTimes, setDateTimes] = React.useState<string | []>([]);
  const [hosts, setHosts] = React.useState<[]>([]);

  //조회하기 위해 시간형식 변환 후 -> axios 요청
  const search = async (startAt: Date | null, endAt: Date | null) => {
    const startStr = props.startAt
      ?.toISOString()
      .replace("T", " ")
      .substring(0, 16);
    const endStr = props.endAt
      ?.toISOString()
      .replace("T", " ")
      .substring(0, 16);

    const hostnames = ["na", "ha", "ba", "ra"];

    const hostParam = {
      hostnames: hostnames.join(","),
      startAt: startStr,
      endAt: endStr,
    };

    await axios
      .get(`${URL}/thread/states?`, { params: hostParam })
      .then((res) => {
        console.log("res", res);
        // setDateTimes(res.dateTimes)
        // setHosts(res.hosts)
        // setRUN(res.RUNNABLE)
        // setBlocked(res.BLOCKED)
        // setWatting(res.WATTING)
        // setTIMED(res.TIMED_WAITING)
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  // 어떤 조회를 선택했는지 확인
  const searchCategory = async () => {
    if (props.category === "point") {
      search(props.pointAt, props.pointAt);
    } else if (props.category === "range") {
      search(props.startAt, props.endAt);
    }
  };

  React.useEffect(() => {
    searchCategory();
  }, [props.pointAt, props.endAt]);

  const dummyDateTimes: string[] = getDatesInRange(
    new Date("2022-05-09 00:00:00"),
    new Date("2022-05-10 00:00:00")
  );

  const dummyDatas: number[][] = [];
  for (let i = 0; i < 4; i++) {
    dummyDatas.push(
      Array.from({ length: dummyDateTimes.length }, () =>
        Math.floor(Math.random() * 20 + 40)
      )
    );
  }

  const data = {
    labels: dummyDateTimes,
    datasets: [
      {
        label: "RUNNABLE",
        data: dummyDatas[0],
        fill: true,
        backgroundColor: "rgb(0, 215, 199, 0.5)",
        borderColor: "rgb(0, 215, 199, 1)",
      },
      {
        label: "BLOCKED",
        data: dummyDatas[1],
        fill: true,
        backgroundColor: "rgb(228, 59, 94, 0.5)",
        borderColor: "rgb(228, 59, 94, 1)",
      },
      {
        label: "WAITING",
        data: dummyDatas[2],
        fill: true,
        backgroundColor: "rgb(255, 124, 75, 0.5)",
        borderColor: "rgb(255, 124, 75, 1)",
      },
      {
        label: "TIMED_WAITING",
        data: dummyDatas[3],
        fill: true,
        backgroundColor: "rgb(0, 151, 225, 0.5)",
        borderColor: "rgb(0, 151, 225, 1)",
      },
    ],
  };

  const pointOnClick = (event: object, element: PointElementProp[]): void => {
    const idx: number = element[0].index;
    console.log(dummyDateTimes[idx]);
  };

  const options: object = {
    response: true,
    onClick: pointOnClick,
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
    scales: {
      // x: {
      //   type: "time",
      //   time: {
      //     unit: "second",
      //   },
      // },
      y: {
        stacked: true,
      },
    },
    elements: {
      point: {
        borderWidth: 0,
        radius: 0,
        hoverRadius: 10,
        backgroundColor: "rgba(0,0,0,0)",
      },
      line: {
        borderWidth: 1,
        // tension: 0.1,
      },
    },
    plugins: {
      zoom: {
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: "x",
        },
        pan: {
          enabled: true,
          overScaleMode: "y",
        },
      },
      // tooltip: {
      //   yAlign: "top",
      // },
    },
  };

  return (
    <Box>
      <Line data={data} options={options} />
    </Box>
  );
}

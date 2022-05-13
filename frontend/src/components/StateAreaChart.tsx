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
// import { getDatesInRange } from "../utils/formatter";
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
  const [logTime, setLogTime] = React.useState<string[]>([]);
  const [hosts, setHosts] = React.useState<any>([]);
  const [runnable, setRunnable] = React.useState<[]>([]);
  const [blocked, setBlocked] = React.useState<[]>([]);
  const [waiting, setWaiting] = React.useState<[]>([]);
  const [timed, setTimed] = React.useState<[]>([]);
  const [all, setAll] = React.useState<any>([]);

  //조회하기 위해 시간형식 변환 후 -> axios 요청
  const search = async (startAt: Date | null, endAt: Date | null) => {
    const startStr = startAt?.toISOString().replace("T", " ").substring(0, 19);
    const endStr = endAt?.toISOString().replace("T", " ").substring(0, 19);
    const hosts = ["k6s10211.p.ssafy.io", "k6s10212.p.ssafy.io"];
    const hostParam = {
      host: hosts.join(","),
    };

    await axios
      .get(`${URL}/api/thread/states?startAt=${startStr}&endAt=${endStr}`, {
        params: hostParam,
      })
      .then((res) => {
        const info = res.data.hostList;
        setAll(info);
        setLogTime(info.logTime);
        setHosts(info.hosts);
        setRunnable(info.threadStateCountList.runnable);
        setBlocked(info.threadStateCountList.blocked);
        setWaiting(info.threadStateCountList.waiting);
        setTimed(info.threadStateCountList.timed_WAITING);
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
  }, [props.pointAt, props.startAt, props.endAt]);

  // const dummyDateTimes: string[] = getDatesInRange(
  //   new Date("2022-05-09 00:00:00"),
  //   new Date("2022-05-10 00:00:00")
  // );

  // const dummyDatas: number[][] = [];
  // for (let i = 0; i < 4; i++) {
  //   dummyDatas.push(
  //     Array.from({ length: dummyDateTimes.length }, () =>
  //       Math.floor(Math.random() * 20 + 40)
  //     )
  //   );
  // }
  // console.log("여기다", all.hosts[0]._ids);

  const data = {
    labels: logTime,
    datasets: [
      {
        label: "RUNNABLE",
        data: runnable,
        fill: true,
        backgroundColor: "rgb(0, 215, 199, 0.5)",
        borderColor: "rgb(0, 215, 199, 1)",
      },
      {
        label: "BLOCKED",
        data: blocked,
        fill: true,
        backgroundColor: "rgb(228, 59, 94, 0.5)",
        borderColor: "rgb(228, 59, 94, 1)",
      },
      {
        label: "WAITING",
        data: waiting,
        fill: true,
        backgroundColor: "rgb(255, 124, 75, 0.5)",
        borderColor: "rgb(255, 124, 75, 1)",
      },
      {
        label: "TIMED",
        data: timed,
        fill: true,
        backgroundColor: "rgb(0, 151, 225, 0.5)",
        borderColor: "rgb(0, 151, 225, 1)",
      },
    ],
  };

  const pointOnClick = (event: object, element: PointElementProp[]): void => {
    const idx: number = element[0].index;

    const ids: string[] = [];
    for (let i = 0; i < hosts.length; i++) {
      ids.push(hosts[i]._ids[idx]);
    }

    props.setSelectedIds(ids);
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

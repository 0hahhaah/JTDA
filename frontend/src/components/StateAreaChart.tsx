import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../api/index";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import zoomPlugin from "chartjs-plugin-zoom";
import changeTime from "./ChangeTimeForm";
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
import { AreaChartProps } from "../interfaces/ChartJS.interface";

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

export default function StateAreaChart({
  pointAt,
  startAt,
  endAt,
  category,
  setSelectedTime,
}: AreaChartProps) {
  const [logTime, setLogTime] = useState<string[]>([]);
  const [hosts, setHosts] = useState<any>([]);
  const [runnable, setRunnable] = useState<any[]>([]);
  const [blocked, setBlocked] = useState<any[]>([]);
  const [waiting, setWaiting] = useState<any[]>([]);
  const [timed, setTimed] = useState<any[]>([]);

  // const changeTime = (value: Date | null) => {
  //   if (value !== null) {
  //     const koreaTime = new Date(
  //       value.getTime() - value.getTimezoneOffset() * 60000
  //     )
  //       .toISOString()
  //       .replace("T", " ")
  //       .substring(0, 19);
  //     return koreaTime;
  //   }
  // };

  //조회하기 위해 시간형식 변환 후 -> axios 요청
  const search = async (startAt: Date | null, endAt: Date | null) => {
    if (startAt !== null && endAt !== null) {
      const startStr = changeTime(startAt);
      const endStr = changeTime(endAt);

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
          console.log(res.data);

          if (startStr === endStr) {
            setLogTime([info.logTime[0], info.logTime[0]]);
            setHosts([info.hosts[0], info.hosts[0]]);
            setRunnable([
              info.threadStateCountList.runnable[0],
              info.threadStateCountList.runnable[0],
            ]);
            setBlocked([
              info.threadStateCountList.blocked[0],
              info.threadStateCountList.blocked[0],
            ]);
            setWaiting([
              info.threadStateCountList.waiting[0],
              info.threadStateCountList.waiting[0],
            ]);
            setTimed([
              info.threadStateCountList.timed_WAITING[0],
              info.threadStateCountList.timed_WAITING[0],
            ]);
          } else {
            setLogTime(info.logTime);
            setHosts(info.hosts);
            setRunnable(info.threadStateCountList.runnable);
            setBlocked(info.threadStateCountList.blocked);
            setWaiting(info.threadStateCountList.waiting);
            setTimed(info.threadStateCountList.timed_WAITING);
          }
        })

        .catch((err) => {
          console.log("err", err);
        });
    }
  };

  // 어떤 조회를 선택했는지 확인
  const searchCategory = async () => {
    if (category === "point") {
      search(pointAt, pointAt);
    } else if (category === "range") {
      search(startAt, endAt);
    }
  };

  useEffect(() => {
    searchCategory();
  }, [pointAt, startAt, endAt]);

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
        label: "TIMED_WAITING",
        data: timed,
        fill: true,
        backgroundColor: "rgb(0, 151, 225, 0.5)",
        borderColor: "rgb(0, 151, 225, 1)",
      },
    ],
  };

  const pointOnClick = (event: object, element: PointElementProp[]): void => {
    const idx: number = element[0].index;

    setSelectedTime(logTime[idx]);
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

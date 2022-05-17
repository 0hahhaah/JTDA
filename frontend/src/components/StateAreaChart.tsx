import * as React from "react";
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
import { PropsType } from "../interfaces/ChartJS.interface";
import CircularProgress from "@mui/material/CircularProgress";

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
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function StateAreaChart(props: PropsType) {
  const [logTime, setLogTime] = React.useState<string[]>([]);
  const [hosts, setHosts] = React.useState<any>([]);
  const [runnable, setRunnable] = React.useState<any[]>([]);
  const [blocked, setBlocked] = React.useState<any[]>([]);
  const [waiting, setWaiting] = React.useState<any[]>([]);
  const [timed, setTimed] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [noData, setNoData] = React.useState<boolean>(false);

  //조회하기 위해 시간형식 변환 후 -> axios 요청
  const search = async (startAt: Date | null, endAt: Date | null) => {
    if (
      startAt !== null &&
      endAt !== null &&
      props.selectedHostNames.length > 0
    ) {
      setLoading(true);
      const startStr = changeTime(startAt);
      const endStr = changeTime(endAt);
      const hostParam = {
        host: props.selectedHostNames.join(","),
      };
      console.log("ostParam", hostParam);
      await axios
        .get(`${URL}/api/thread/states?startAt=${startStr}&endAt=${endStr}`, {
          params: hostParam,
        })
        .then((res) => {
          setLoading(false);
          const info = res.data.hostList;
          console.log("차트 api 요청 결과입니다.", res.data);
          if (info.dataCount === 0) {
            setNoData(true);
          } else if (startStr === endStr) {
            setNoData(false);
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
            setNoData(false);
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
    if (props.category === "point") {
      search(props.pointAt, props.pointAt);
    } else if (props.category === "range") {
      search(props.startAt, props.endAt);
    }
  };

  // 시간 바뀔때마다 다시!
  React.useEffect(() => {
    searchCategory();
  }, [
    props.pointAt,
    props.startAt,
    props.endAt,
    props.category,
    props.selectedHostNames,
  ]);

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

  // 로딩중 + 데이터 유무에 따라 출력 다르게
  const byLoading = (): JSX.Element => {
    if (loading && props.selectedHostNames[0]) {
      return <CircularProgress size={80} />;
    } else {
      if (noData) {
        return <>"데이터가 없습니다."</>;
      } else {
        return <Line data={data} options={options} />;
      }
    }
  };

  // 호스트 선택 유무에 따라 출력 다르게
  const output = () => {
    if (props.selectedHostNames.length <= 0) {
      return "검색할 Host를 선택하세요";
    } else {
      return byLoading();
    }
  };

  return <Box>{output()}</Box>;
}

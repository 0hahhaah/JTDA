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
import CircularProgress from "@mui/material/CircularProgress";
import { HostChartSummary } from "../interfaces/HostInfo.interface";

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

export default function StateAreaChart({
  pointAt,
  startAt,
  endAt,
  category,
  setSelectedTime,
  selectedHostNames,
}: AreaChartProps) {
  const [hostData, setHostData] = useState<HostChartSummary>();
  const [loading, setLoading] = useState<boolean>(false);
  const [noData, setNoData] = useState<boolean>(false);

  //조회하기 위해 시간형식 변환 후 -> axios 요청
  const search = async (startAt: Date | null, endAt: Date | null) => {
    if (startAt !== null && endAt !== null && selectedHostNames.length > 0) {
      setLoading(true);
      const startStr = changeTime(startAt);
      const endStr = changeTime(endAt);
      const hostParam = {
        host: selectedHostNames.join(","),
      };
      await axios
        .get(`${URL}/api/thread/states?startAt=${startStr}&endAt=${endStr}`, {
          params: hostParam,
        })
        .then((res) => {
          const info = res.data.hostList;

          setHostData(info);
          if (info.dataCount === 1)
            if (info.dataCount === 0) {
              setNoData(true);
            } else {
              setNoData(false);
            }

          setLoading(false);
        })

        .catch((err) => {
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

  // 시간 바뀔때마다 다시!
  useEffect(() => {
    searchCategory();
  }, [pointAt, startAt, endAt, category, selectedHostNames]);

  const data = {
    labels:
      hostData?.dataCount === 1
        ? new Array(2).fill(hostData?.logTime[0])
        : hostData?.logTime,
    datasets: [
      {
        label: "RUNNABLE",
        data:
          hostData?.dataCount === 1
            ? new Array(2).fill(hostData?.threadStateCountList.runnable[0])
            : hostData?.threadStateCountList.runnable,
        fill: true,
        backgroundColor: "rgb(0, 215, 199, 0.5)",
        borderColor: "rgb(0, 215, 199, 1)",
      },
      {
        label: "BLOCKED",
        data:
          hostData?.dataCount === 1
            ? new Array(2).fill(hostData?.threadStateCountList.blocked[0])
            : hostData?.threadStateCountList.blocked,
        fill: true,
        backgroundColor: "rgb(228, 59, 94, 0.5)",
        borderColor: "rgb(228, 59, 94, 1)",
      },
      {
        label: "WAITING",
        data:
          hostData?.dataCount === 1
            ? new Array(2).fill(hostData?.threadStateCountList.waiting[0])
            : hostData?.threadStateCountList.waiting,
        fill: true,
        backgroundColor: "rgb(255, 124, 75, 0.5)",
        borderColor: "rgb(255, 124, 75, 1)",
      },
      {
        label: "TIMED_WAITING",
        data:
          hostData?.dataCount === 1
            ? new Array(2).fill(hostData?.threadStateCountList.timed_WAITING[0])
            : hostData?.threadStateCountList.timed_WAITING,
        fill: true,
        backgroundColor: "rgb(0, 151, 225, 0.5)",
        borderColor: "rgb(0, 151, 225, 1)",
      },
    ],
  };

  const pointOnClick = (event: object, element: PointElementProp[]): void => {
    const idx: number = element[0].index;
    if (hostData && hostData.logTime) {
      setSelectedTime(hostData.logTime[idx]);
    }
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
    if (loading && selectedHostNames[0]) {
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
    if (selectedHostNames.length <= 0) {
      return "검색할 Host를 선택하세요";
    } else {
      return byLoading();
    }
  };

  return <Box>{output()}</Box>;
}

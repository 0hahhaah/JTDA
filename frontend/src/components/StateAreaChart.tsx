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

export default function StateAreaChart() {
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
        label: "host-1",
        data: dummyDatas[0],
        fill: true,
        backgroundColor: "rgb(0, 215, 199, 0.5)",
        borderColor: "rgb(0, 215, 199, 1)",
      },
      {
        label: "host-1",
        data: dummyDatas[1],
        fill: true,
        backgroundColor: "rgb(228, 59, 94, 0.5)",
        borderColor: "rgb(228, 59, 94, 1)",
      },
      {
        label: "host-1",
        data: dummyDatas[2],
        fill: true,
        backgroundColor: "rgb(255, 124, 75, 0.5)",
        borderColor: "rgb(255, 124, 75, 1)",
      },
      {
        label: "host-1",
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

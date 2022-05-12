import styled from "styled-components";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Box = styled.div`
  padding: 0% 2%;
  width: 50%;
`;

export const options = {
  plugins: {
    title: {
      display: true,
      text: "시간별 thread 정보",
    },
  },
  responsive: true,
  interaction: {
    mode: "index" as const,
    intersect: false,
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "BLOCKED",
      data: [23, 14, 4, 7],
      backgroundColor: "rgb(255, 116, 111, 1)",
      stack: "Stack 0",
    },
    {
      label: "RUNNABLE",
      data: [14, 4, 23, 17],
      backgroundColor: "rgb(0, 214, 227, 1)",
      stack: "Stack 0",
    },
    {
      label: "WAITING",
      data: [30, 1, 13, 27],
      backgroundColor: "rgb(255, 139, 40, 1)",
      stack: "Stack 0",
    },
    {
      label: "TIMED_WAITING",
      data: [30, 1, 13, 27],
      backgroundColor: "rgb(52, 149, 228, 1)",
      stack: "Stack 0",
    },
  ],
};

export default function TimeChart() {
  return (
    <Box>
      <Bar options={options} data={data} />
    </Box>
  );
}

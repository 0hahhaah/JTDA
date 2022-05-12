import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { PieChartProps } from "../interfaces/ChartJS.interface";

const Title = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Box = styled.div`
  width: 300px;
  height: 300px;
  grid-column: span 1 / span 1;
`;

ChartJS.register(ArcElement, Tooltip, Legend);

export default function StatePieChart({ threadInfo }: PieChartProps) {
  const data = {
    labels: ["RUNNABLE", "BLOCKED", "WAITING", "TIMED_WAITING"],
    datasets: [
      {
        label: "# of Threads",
        data: Object.values(threadInfo.threadState),
        backgroundColor: [
          "rgb(0, 215, 199, 0.8)",
          "rgb(228, 59, 94, 0.8)",
          "rgb(255, 124, 75, 0.8)",
          "rgb(0, 151, 225, 0.8)",
        ],
        hoverOffset: 10,
      },
    ],
  };

  const options: object = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
      },
    },
  };

  return (
    <Box>
      <Title>Thread State (%)</Title>
      <Pie data={data} options={options} />
    </Box>
  );
}

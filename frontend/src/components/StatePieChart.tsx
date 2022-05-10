import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { ThreadInfo } from "../interfaces/ThreadDump.interface";
import { useState } from "react";

const Title = styled.div`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Box = styled.div`
  width: 300px;
  height: 300px;
`;

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  threadInfo: ThreadInfo;
}

export default function StatePieChart({ threadInfo }: PieChartProps) {
  const [data, setData] = useState({
    labels: ["BLOCKED", "RUNNABLE", "WAITING", "TIMED_WAITING"],
    datasets: [
      {
        label: "# of Threads",
        data: Object.values(threadInfo.threadState),
        backgroundColor: ["#FF746F", "#00D6E3", "#FF8B28", "#3495E4"],
        hoverOffset: 10,
      },
    ],
  });

  return (
    <Box>
      <Title>Thread State %</Title>
      <Pie data={data} />
    </Box>
  );
}

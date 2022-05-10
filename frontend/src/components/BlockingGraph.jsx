import { useEffect, useRef, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { DendogramChart } from "chartjs-chart-graph";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend, PointElement);

export default function BlockingGraph() {
  const canvasDom = useRef(null);
  const dumpURL = `https://raw.githubusercontent.com/sgratzl/chartjs-chart-graph/master/samples/tree.json`;
  const [data, setData] = useState();

  useEffect(() => {
    axios
      .get(dumpURL)
      .then((res) => res.data)
      .then((nodes) => {
        setData(nodes);
      });
  }, []);

  useEffect(() => {
    const ctx = canvasDom.current.getContext("2d");
    if (data) {
      const nowChart = new ChartJS(ctx, {
        plugins: [ChartDataLabels, DendogramChart],
        type: "dendogram",
        data: {
          labels: data.map((d) => d.name),
          datasets: [
            {
              pointBackgroundColor: "#FFFFFF",
              pointBorderColor: "#5f0080",
              pointRadius: 5,
              data: data.map((d) => Object.assign({}, d)),
            },
          ],
        },
        options: {
          dragData: true,
          dragX: true,
          tree: { orientation: "horizontal" },
          layout: {
            padding: {
              top: 5,
              left: 5,
              right: 40,
              bottom: 20,
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            datalabels: {
              align: "right",
              offset: 6,
              backgroundColor: "white",
              formatter: (v) => {
                return v.name;
              },
            },
          },
        },
      });
    }
  }, [data]);

  return (
    <>
      <canvas ref={canvasDom} width="500" height="500"></canvas>
    </>
  );
}

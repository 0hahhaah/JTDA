import { PointElement } from "chart.js";
import { ThreadInfo } from "./ThreadDump.interface";

export interface PointElementProp {
  element: PointElement;
  datasetIndex: number;
  index: number;
}

export interface PieChartProps {
  threadInfo: ThreadInfo;
}

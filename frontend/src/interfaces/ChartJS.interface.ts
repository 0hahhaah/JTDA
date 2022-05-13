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

export interface PropsType {
  pointAt: Date | null;
  startAt: Date | null;
  endAt: Date | null;
  category: string;
  selectedIds: any;
  setSelectedIds: React.Dispatch<React.SetStateAction<any>>;
}

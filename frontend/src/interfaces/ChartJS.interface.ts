import { PointElement } from "chart.js";
import { ThreadStateCount } from "./Threadinterface";

export interface PointElementProp {
  element: PointElement;
  datasetIndex: number;
  index: number;
}

export interface PieChartProps {
  threadStateCount: ThreadStateCount;
}

export interface PropsType {
  pointAt: Date | null;
  startAt: Date | null;
  endAt: Date | null;
  category: string;
  setSelectedIds: React.Dispatch<React.SetStateAction<any>>;
}

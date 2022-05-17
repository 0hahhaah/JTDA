import { ThreadStateCount } from "./Threadinterface";

export interface hostInfo {
  _id: string,
  cluster: string,
  host: string,
  tags: Array<string>
}

export interface HostSummary {
  _id: string;
  host: string;
  logTime: string;
  threadCount: number;
  threadStateCount: ThreadStateCount;
  daemonCount: number;
  nonDaemonCount: number;
}

export interface Tags{
  tag: string;
  checkedTags: string[];
  checkedTagsHandler: (code: string, isChecked: boolean) => void;
}

export interface Host {
  host: string;
  tags: string[];
}
export interface Cluster {
  cluster: string;
  hosts: Host[];
}

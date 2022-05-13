import { ThreadStateCount } from "./Threadinterface";

export interface hostInfo {
  hostIp: string;
  hostName: string;
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

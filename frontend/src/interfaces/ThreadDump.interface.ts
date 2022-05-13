export interface ThreadStateCount {
  [index: string]: number;
  BLOCKED: number;
  RUNNABLE: number;
  WAITING: number;
  TIMED_WAITING: number;
}

export interface ThreadDump {
  id: string;
  hashId: string;
  name: string;
  isDaemon: boolean;
  priority: number;
  state: string;
  lockOwner: string;
  stackTrace: string[];
  lockedOwnableSynchronizers: string[];
}

export interface ThreadLog {
  hostIp: string;
  hostName: string;
  processId: string;
  logTime: string;
  vmInfo: string;
  threadCount: number;
  threadElements: string[];
  threadDumps: ThreadDump[];
}

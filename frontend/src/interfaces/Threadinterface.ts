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
  daemon: boolean;
  priority: number;
  state: string;
  lockOwner: string;
  stackTrace: string[];
  lockedOwnableSynchronizers: string[];
}

export interface ThreadDetailReponse {
  threadCount: number;
  threadStateDetails: ThreadDetail;
}

export interface ThreadDetail {
  _id: string;
  cluster: string;
  host: string;
  tags: string[];
  logTime: string;
  threadDumps: ThreadDump[];
}

import {
  ThreadDump,
  ThreadInfo,
  ThreadLog,
} from "../interfaces/ThreadDump.interface";

export const dummyThread: ThreadInfo = {
  count: 100,
  threadState: {
    BLOCKED: 20,
    RUNNABLE: 40,
    WAITING: 30,
    TIMED_WAITING: 10,
  },
};

export const dummyThreadDumps: ThreadDump[] = Array.from(Array(10).keys()).map(
  (index) => {
    const dummyThreadDump: ThreadDump = {
      id: index.toString(),
      hashId: "0x0000000042a57993",
      name: `Thread-${index}`,
      isDaemon: true,
      priority: 1,
      state: "WAITING",
      lockOwner: "20@Thread-FirstOrder",
      stackTrace: [
        "at java.lang.Object.wait(Native Method)\n- waiting on <0x7ec00a40> (a java.lang.Object)",
        "at java.lang.Object.wait(Object.java:503)",
        "at oracle.ons.NotificationQueue.internalDequeue(NotificationQueue.java:256)",
      ],
      lockedOwnableSynchronizers: [""],
    };
    return dummyThreadDump;
  }
);

export const dummyThreadLog: ThreadLog = {
  hostIp: "172.17.0.2",
  hostName: "e7882cd4e607",
  processId: "process_id",
  logTime: "2022-04-19 16:22:30",
  vmInfo: "",
  threadCount: 100,
  threadElements: ["0x000000002e6b22eb", "0x000000006ceb8b2b"],
  threadDumps: dummyThreadDumps,
};

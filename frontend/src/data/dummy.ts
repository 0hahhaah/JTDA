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

export const dummyThreadDumps: ThreadDump[] = Array.from(Array(30).keys()).map(
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
  processId: "32",
  logTime: "2022-04-19 16:22:30",
  vmInfo: "OpenJDK 64-Bit Server VM (25.212-b04 mixed mode):",
  threadCount: 100,
  threadElements: [
    "0x0000000031a979c9",
    "0x0000000060d65ff7",
    "0x0000000033909752",
    "0x0000000024f50bb0",
    "0x00000000709473f2",
    "0x00000000510eb9e9",
    "0x000000003bb32194",
    "0x000000003d4eac69",
    "0x0000000075b84c92",
    "0x000000000f514e9d",
    "0x0000000003f57dd8",
    "0x000000003596eb24",
    "0x0000000042a57993",
    "0x0000000035e32a3a",
    "0x000000003f6e8054",
    "0x000000007d10ee8b",
    "0x0000000055f96302",
  ],
  threadDumps: dummyThreadDumps,
};

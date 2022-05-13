import { useState } from "react";
import SideBar from "../components/SideBar";
import Thread from "../components/Thread";
import { ThreadDump } from "../interfaces/Threadinterface";

export default function Detail() {
  const [threadDumps, setThreadDumps] = useState<ThreadDump[]>([]);

  return (
    <>
      <SideBar threadDumps={threadDumps} />
      <Thread setThreadDumps={setThreadDumps} />
    </>
  );
}

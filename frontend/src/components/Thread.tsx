import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { handleStateColor } from "./ThreadSummary";
import { ThreadDetail, ThreadDump } from "../interfaces/Threadinterface";
import axios from "axios";
import { queryParser } from "../utils/queryParser";
import { URL } from "../api";

const Container = styled.div`
  padding: 30px;
`;

const Title = styled.h1`
  color: #333333;
  margin: 50px 0px 0px 50px;
`;

const SubTitle = styled.h2<{
  fontSize?: string;
  color?: string;
}>`
  color: ${({ color }) => color || "#999999"};
  font-size: ${({ fontSize }) => fontSize || ""};
  margin: 0px 0px 0px 50px;
`;

const Box = styled.div<{ selected: boolean }>`
  text-align: left;
  margin: 20px 50px;
  padding: 10px;
  border: 2px solid ${({ selected }) => (selected ? "#5f0080" : "#f7f7f7")};
  border-radius: 10px;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

  transition: all 0.2s ease-in-out;
`;

const ThreadName = styled.h2`
  margin: 10px;
  font-size: 1.5rem;
  font-weight: 600;
  color: #5f0080;
  text-align: left;
`;

const ThreadInfos = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 10px;
  gap: 10px;
`;

const ThreadInfo = styled.p`
  margin: 0px;
  grid-column: span 1 / span 2;
  font-size: 1rem;
  font-weight: 500;
  color: rgb(107, 114, 128);
`;

const StackTrace = styled.div`
  margin: 10px;
  font-size: 0.875rem;
`;

const LineText = styled.p`
  margin: 0 0 0 10px;
  white-space: pre-wrap;
`;

interface ThreadProps {
  setThreadDumps: React.Dispatch<React.SetStateAction<ThreadDump[]>>;
}

export default function Thread({ setThreadDumps }: ThreadProps) {
  const { search, hash } = useLocation();
  const { id, state } = queryParser(search);
  const [threadDetail, setThreadDetail] = useState<ThreadDetail>();
  useEffect(() => {
    const fetchAndSetThreadDetail = async () => {
      let requestURL: string;
      if (state) {
        requestURL = URL + `/api/thread/detail?_id=${id}&state=${state}`;
      } else {
        requestURL = URL + `/api/thread/detail?_id=${id}`;
      }

      const res = await axios.get(requestURL);
      setThreadDetail(res.data.threadStateDetails);
      setThreadDumps(res.data.threadStateDetails.threadDumps);
    };

    fetchAndSetThreadDetail();
  }, [search]);

  const paintthreadDetail = threadDetail?.threadDumps.map((threadDump, idx) => {
    return (
      <Box
        key={idx}
        id={threadDump.id}
        selected={threadDump.id === hash.replace("#", "")}
      >
        <ThreadName>{threadDump.name}</ThreadName>
        <ThreadInfos>
          <ThreadInfo>{`THREAD ID (DECIMAL): ${threadDump.id}`}</ThreadInfo>
          <ThreadInfo>{`THREAD ID (HASH): ${threadDump.hashId}`}</ThreadInfo>
          <ThreadInfo>
            {`IS DAEMON: ${threadDump.daemon ? true : false}`}
          </ThreadInfo>
          <ThreadInfo>{`PRIORITY: ${threadDump.priority}`}</ThreadInfo>
          <ThreadInfo>{`STATE: ${threadDump.state}`}</ThreadInfo>
          <ThreadInfo>{`LOCK OWNER: ${threadDump.lockOwner}`}</ThreadInfo>
        </ThreadInfos>
        <StackTrace>
          <ThreadInfo>{`STACKTRACES:`}</ThreadInfo>
          {`java.lang.Thread.State: ${threadDump.state}`}
          <br />
          {paintStringArray(threadDump.stackTrace)}
        </StackTrace>
        {paintStringArray(threadDump.lockedOwnableSynchronizers)}
      </Box>
    );
  });

  function paintStringArray(stringArray: string[]): JSX.Element[] {
    return stringArray.map((stringElement, idx) => (
      <LineText key={idx}>{stringElement}</LineText>
    ));
  }

  if (threadDetail === undefined) {
    return <>Loading...</>;
  }

  return (
    <Container>
      <Title>{`${threadDetail.cluster}@${threadDetail.host}`}</Title>
      <SubTitle>{`tags: ${threadDetail.tags}`}</SubTitle>
      <SubTitle>{`${threadDetail.logTime}`}</SubTitle>
      <SubTitle
        fontSize={"2rem"}
        color={handleStateColor(state).replace(", 0.5", "")}
      >{`${state ? state : "ALL STATES"}`}</SubTitle>
      {paintthreadDetail}
    </Container>
  );
}

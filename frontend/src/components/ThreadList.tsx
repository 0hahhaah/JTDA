import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { dummyThreadLog } from "../data/dummy";
import { ThreadDump } from "../interfaces/ThreadDump.interface";

const List = styled.div`
  width: 100%;
  padding: 10px 0 10px 0;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 3px 3px #cdcdcd;
  height: 50vh;
  overflow: scroll;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    width: 5px;
    height: 70%;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: #cdcdcd;
  }
`;

const HashLink = styled.div<{ selected: boolean }>`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 10px;
  border-radius: 5px;
  ${({ selected }) => selected && `background-color: #5f0080; color: white;`}

  &:hover {
    background-color: #5f0080;
    color: white;
  }
`;

const Message = styled.div`
  padding: 10px;
  font-size: 0.875rem;
  color: #999999;
`;

interface ThreadListProps {
  searchInput: string;
}

export default function ThreadList({ searchInput }: ThreadListProps) {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();
  const [originalThreadDumps, setOriginalThreadDumps] = useState<ThreadDump[]>(
    dummyThreadLog.threadDumps
  );
  const [filteredThreadDumps, setFilteredThreadDumps] =
    useState<ThreadDump[]>(originalThreadDumps);

  const headerOffset: number = 50;
  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === "") {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id: string = hash.replace("#", "");
        const element = document.getElementById(id)!;
        if (element) {
          const elementPosition: number = element.getBoundingClientRect().top;
          const offsetPosition: number =
            elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 0);
    }
  }, [pathname, search, hash]); // do this on route change

  useEffect(() => {
    if (searchInput) {
      setFilteredThreadDumps(
        originalThreadDumps.filter((threadDump) =>
          threadDump.name.includes(searchInput)
        )
      );
    } else {
      setFilteredThreadDumps([...originalThreadDumps]);
    }
  }, [searchInput]);

  const paintThreadNames: JSX.Element[] = filteredThreadDumps.map(
    ({ id, name }, idx) => (
      <HashLink
        key={idx}
        selected={id === hash.replace("#", "")}
        onClick={() => navigate(`${search}#${id}`)}
      >
        {name}
      </HashLink>
    )
  );

  return (
    <List>
      {filteredThreadDumps.length ? (
        paintThreadNames
      ) : (
        <Message>No matched Thread</Message>
      )}
    </List>
  );
}

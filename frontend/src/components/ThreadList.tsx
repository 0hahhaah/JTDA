import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { dummyThreadLog } from "../data/dummy";

const List = styled.div`
  width: 100%;
  padding: 10px 0 10px 0;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 3px 3px #cdcdcd;
`;

const HashLink = styled.div`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 10px;
  border-radius: 5px;

  &:hover {
    background-color: #5f0080;
    color: white;
  }
`;

interface ThreadListProps {
  searchInput: string;
}

export default function ThreadList({ searchInput }: ThreadListProps) {
  const navigate = useNavigate();
  const { pathname, search, hash } = useLocation();

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
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    }
  }, [pathname, search, hash]); // do this on route change

  const paintThreadNames: JSX.Element[] = dummyThreadLog.threadDumps.map(
    ({ id, name }, idx) => (
      <HashLink key={idx} onClick={() => navigate(`${search}#${id}`)}>
        {name}
      </HashLink>
    )
  );

  return <List>{paintThreadNames}</List>;
}

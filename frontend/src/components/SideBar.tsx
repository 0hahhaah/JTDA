import { Logo } from "./Logo";
import styled from "styled-components";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import SideBarList from "./SideBarList";
import ThreadList from "./ThreadList";
import { ThreadDump } from "../interfaces/Threadinterface";

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Layout = styled(Center)`
  width: 300px;
  height: 100vh;
  background-color: #f7f7f7;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0px 3px 3px #cdcdcd;
`;

const Base = styled(Center)`
  height: 100%;
  padding: 1rem;
`;

///잘 안되네요..
const Container = styled(Center)`
  width: 100%;
  height: 100%;
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

const Footer = styled.div`
  width: 100%;
  background-color: #cdcdcd;
  bottom: 0;
  padding: 5px 0;
  font-size: 1rem;
  text-align: center;
`;

interface Props {
  startAt?: Date | null | undefined;
  endAt?: Date | null | undefined;
  threadDumps?: ThreadDump[];
}

export default function SideBar({ startAt, endAt, threadDumps }: Props) {
  const { pathname } = useLocation();
  const isMain: boolean = pathname === "/" ? true : false;

  const [searchInput, setSearchInput] = useState<string>("");
  const [searchCategory, setSearchCategory] = useState<string>("");

  return (
    <Layout>
      <Base>
        <Logo></Logo>
        <SearchBar isMain={isMain} setSearchInput={setSearchInput} setSearchCategory={setSearchCategory}></SearchBar>
        <Container>
          {isMain 
            ? <SideBarList 
                searchInput={searchInput}
                searchCategory={searchCategory}
                startAt={startAt}
                endAt={endAt}/> 
            : (
            <ThreadList searchInput={searchInput} threadDumps={threadDumps} />
          )}
        </Container>
      </Base>
      <Footer>Copyright ⓒ E1I4</Footer>
    </Layout>
  );
}

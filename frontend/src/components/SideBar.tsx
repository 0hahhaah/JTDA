import { Logo } from "./Logo";
import styled from "styled-components";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";
import SideBarList from "./SideBarList";
import ThreadList from "./ThreadList";

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Layout = styled(Center)`
  width: 15%;
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

const Footer = styled.div`
  width: 100%;
  background-color: #cdcdcd;
  bottom: 0;
  padding: 5px 0;
  font-size: 1rem;
  text-align: center;
`;
export default function SideBar() {
  const { pathname } = useLocation();
  const isMain: boolean = pathname === "/" ? true : false;

  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <Layout>
      <Base>
        <Logo></Logo>
        <SearchBar isMain={isMain} setSearchInput={setSearchInput}></SearchBar>
        {isMain ? <SideBarList /> : <ThreadList searchInput={searchInput} />}
      </Base>
      <Footer>Copyright ⓒ E1I4</Footer>
    </Layout>
  );
}

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { dummyThreadLog } from "../data/dummy";

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Layout = styled(Center)`
  width: 12%;
  height: 100vh;
  background-color: #bfc1c3;
  position: fixed;
  top: 0;
  left: 0;
`;

const Base = styled(Center)`
  height: 100%;
  padding: 1rem;
`;
const Logo = styled.div`
  background-color: red;
  width: 80%;
  height: 10%;
  margin-bottom: 50px;
`;
const Search = styled.div`
  display: flex;
  width: 100%;
  background-color: blue;
  margin-bottom: 30px;
`;

const Footer = styled.div`
  width: 100%;
  background-color: beige;
  bottom: 0;
  font-size: large;
`;

const List = styled.div`
  background-color: yellow;
  width: 100%;
  min-height: 50%;
`;

const HashLink = styled.div`
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  padding: 5px;

  &:hover {
    background-color: skyblue;
    color: white;
  }
`;

export default function SideBar() {
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

  const [searchInput, setSearchInput] = useState<string>("");

  const paintThreadNames: JSX.Element[] = dummyThreadLog.threadDumps.map(
    ({ id, name }, idx) => (
      <HashLink key={idx} onClick={() => navigate(`${search}#${id}`)}>
        {name}
      </HashLink>
    )
  );

  return (
    <Layout>
      <Base>
        <Logo onClick={() => navigate("/")}>로고</Logo>
        <p>host List</p>
        <Search>
          <input
            style={{ width: "100%" }}
            type="text"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <button>검색</button>
        </Search>
        <List>{paintThreadNames}</List>
      </Base>
      <Footer>Copyright ⓒ E1I4</Footer>
    </Layout>
  );
}

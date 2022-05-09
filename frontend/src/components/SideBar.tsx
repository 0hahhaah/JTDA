import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { Logo } from './Logo'
import styled from "styled-components"
import SideBarList from "./SideBarList"

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Layout = styled(Center) `
  width: 12%;
  height: 100vh;
  background-color: #bfc1c3;
  position: fixed;
  top: 0;
  left: 0;
`

const Base = styled(Center) `
  height: 100%;
  padding: 1rem;  
  `

const Search= styled.div`
  display: flex;
  width: 100%;
  background-color: blue;
  margin-bottom: 30px;
`

const Footer = styled.div`
  width: 100%;
  background-color: beige;
  bottom: 0;
  font-size: large;
`
export default function SideBar () {
  const navigate = useNavigate();
  const [host, setHost] = useState("");
  console.log(host);
  return ( 
    <Layout>
      <Base>
        <Logo></Logo>
        <p>host List</p>
        <Search>
          <input 
            style={{width: '100%'}} 
            type="text" 
            onChange={(e)=>{
              setHost(e.target.value)}}/>
          <button >검색</button>
        </Search>
        <SideBarList/>
      </Base>
      <Footer>
        Copyright ⓒ E1I4
      </Footer>
    </Layout>
    )
}
import { Logo } from './Logo'
import styled from "styled-components"
import SideBarList from "./SideBarList"

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Layout = styled(Center) `
  width: 15%;
  height: 100vh;
  background-color: #F7F7F7;
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0px 3px 3px #CDCDCD;
`

const Base = styled(Center) `
  height: 100%;
  padding: 1rem;  
  `

const Search= styled.div`
  position: relative;
  display: flex;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 20px;
`

const SearchInput = styled.input`
  width: 90%;
  border-radius: 17px;
  padding: 10px;
  padding-left: 15px;
  padding-right: 40px;
  border: 0;
  color: #333333;
  box-shadow: 0px 3px 3px #CDCDCD;
`;

const SearchIcon = styled.span`
  position: absolute;
  right: 10px;
  top: 5px;
  cursor: pointer;
`;

const Footer = styled.div`
  width: 100%;
  background-color: #CDCDCD;
  bottom: 0;
  padding: 5px 0;
  font-size: 1rem;
  text-align: center;
`
export default function SideBar () {
  return ( 
    <Layout>
      <Base>
        <Logo></Logo>
        <Search>
          <SearchInput 
            placeholder='Host IP' />
          {/* <input 
            style={{width: '100%'}} 
            type="text" 
            onChange={(e)=>{
              setHost(e.target.value)}}/>
          <button >검색</button> */}
          <SearchIcon className="material-icons">search</SearchIcon>
        </Search>
        <SideBarList/>
      </Base>
      <Footer>
        Copyright ⓒ E1I4
      </Footer>
    </Layout>
    )
}
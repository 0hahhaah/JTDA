import styled from "styled-components"

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


const Logo = styled.div `
  background-color: red;
  width: 80%;
  height: 10%;
  margin-bottom: 50px;
`
const Search= styled.div`
  display: flex;
  width: 100%;
  background-color: blue;
  margin-bottom: 30px;
`
const List= styled.div`
  background-color: yellow;
  width: 100%;
  min-height: 50%;
`
const Footer = styled.div`
  width: 100%;
  background-color: beige;
  bottom: 0;
  font-size: large;
`
export default function SideBar () {
  return ( 
    <Layout>
      <Base>
        <Logo>로고</Logo>
        <Search>
          <input style={{width: '100%'}}  type="text" />
          <button >검색</button>
        </Search>
        <List>
            host List
        </List>
      </Base>
      <Footer>
        Copyright ⓒ E1I4
      </Footer>
    </Layout>
    )
}
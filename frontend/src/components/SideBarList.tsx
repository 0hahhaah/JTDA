import styled from "styled-components"

const List= styled.div`
  background-color: yellow;
  width: 100%;
  min-height: 50%;
`

export default function SidebarList() {
  const data: Array<string> = [
    'host1',
    'host2',
    'host3',
    'host4',
    'host5',
    'host6',
  ]
  const selectedData: string[] = []

  return(
    <List>
      {data.map((host, i)=>{
        return (
          <>
            <input type='checkbox' id={host} name='host' value={host}></input>
            <label htmlFor={host}>{host}</label>
            <br/>
          </>
        )
      })}
    </List>
  );
}
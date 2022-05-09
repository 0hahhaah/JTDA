import { useCallback, useEffect, useState } from 'react'
import { hostInfo } from '../interfaces/HostInfo.interface'
import axios from 'axios'
import styled from "styled-components"

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Selected = styled(Center)`
  background-color: aqua;
  width: 100%;
  height: 300px;
  overflow: scroll;
  -ms-overflow-style: none;
`;

const List = styled.div`
  background-color: yellow;
  width: 100%;
  min-height: 50%;
`

const ConfirmBtn = styled.button`

`;

const baseUrl = "http://localhost:8081/";

export default function SidebarList() {
  const [hosts, setHosts] = useState<hostInfo>({
    hostIp: '',
    hostName: ''
  });
  const [startAt, setStartAt] = useState("2022-01-31");
  const [endAt, setEndAt] = useState("2022-12-31");
  const [checkedList, setCheckedList] = useState<Array<any> | null>(null);
  const data: Array<string> = [
      'host1',
      'host2',
      'host3',
      'host4',
      'host5',
      'host6',
    ]

  const getHosts = async()=>{
    await axios({
      url: baseUrl + `api/host/list?startAt=${startAt}&endAt=${endAt}`,
      method: "get",
    })
    .then((res) => {
      console.log(res.data.hosts);
      // setHosts(...res.data.hosts);
      console.log('호스트결과', hosts);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  // const onCheckedElement:any = useCallback(
  //   (checked: boolean, list: any) => {
  //     if(checked){
  //       setCheckedList([...checkedList, list]);
  //     } else {
  //       setCheckedList(checkedList.filter((el) => el !== list));
  //     }
  //   },
  // [checkedList]);

  // const onCheckedElement = (id: string, isChecked: boolean) => {
  //   if(isChecked){
  //     checkedList.add(id);
  //     setCheckedList(checkedList);
  //   } else if (!isChecked && checkedList.has(id)) {
  //     checkedList.delete(id);
  //     setCheckedList(checkedList);
  //   }
  // }

  useEffect(()=>{
    getHosts();
  },[]);

  return(
    <>
      <Selected>
        <p>선택된 host</p>
        {/* <ul>
        {
          checkedList.map((host, i)=>{
            return(
              <li>
                {i}
              </li>
            )
          })
        }
        </ul> */}
      </Selected>

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
      {/* <ConfirmBtn onClick={onCheckedElement}>확인</ConfirmBtn> */}
    </>
  );
}


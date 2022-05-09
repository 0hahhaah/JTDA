import { useEffect, useState } from "react";
// import { hostInfo } from "../interfaces/HostInfo.interface";
import axios from "axios";
import styled from "styled-components";

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HostBox = styled(Center)`
  width: 100%;
  border-radius: 10px;
  background-color: white;
  box-shadow: 0px 3px 3px #cdcdcd;
  margin-bottom: 15px;
  padding: 5px 0 10px 0;
`;

const ListBox = styled.div`
  width: 100%;
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

const SelectedHost = styled(HostBox)`
  height: 15%;
`;

const HostList = styled(HostBox)`
  height: 40%;
`;

const ListTitle = styled.div`
  margin: 5px;
  margin-bottom: 10px;
  font-weight: 500;
`;

const HostData = styled(Center)`
  flex-direction: row;
  width: 100%;
  padding-left: 20px;
  margin: 4px 0;
`;

const HostCheckBox = styled.input`
  accent-color: #5f0080;
`;

const HostLabel = styled.label`
  cursor: pointer;
`;

//--------------------------------
const SelectButtons = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
`;

const ConfirmBtn = styled.button`
  background-color: #5f0080;
  border: 0;
  color: white;
  border-radius: 5px;
  padding: 5px 10px;
  margin-left: 7px;
  cursor: pointer;
`;

const AllCancleBtn = styled(ConfirmBtn)`
  background-color: #cdcdcd;
  color: #333333;
`;

const baseUrl = "http://localhost:8081/";

export default function SidebarList() {
  const [hosts, setHosts] = useState([]);
  const [startAt, setStartAt] = useState("2022-01-31");
  const [endAt, setEndAt] = useState("2022-12-31");
  // const [checkedList, setCheckedList] = useState<Array<any> | null>(null);
  const [checkedList, setCheckedList] = useState(null);
  const data = [
    "host1",
    "host2",
    "host3",
    "host4",
    "host5",
    "host6",
    "host7",
    "host8",
    "host9",
    "host10",
    "host11",
    "host12",
  ];

  const getHosts = async () => {
    await axios({
      url: baseUrl + `api/host/list?startAt=${startAt}&endAt=${endAt}`,
      method: "get",
    })
      .then((res) => {
        console.log(res.data.hosts);
        // setHosts(...res.data.hosts);
        console.log("호스트결과", hosts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  useEffect(() => {
    getHosts();
  }, []);

  return (
    <>
      <SelectedHost>
        <ListTitle>선택한 Host</ListTitle>
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
        <ListBox></ListBox>
      </SelectedHost>

      <HostList>
        <ListTitle>Host List</ListTitle>
        <ListBox>
          {data.map((host, i) => {
            return (
              <HostData>
                <HostLabel>
                  <HostCheckBox type="checkbox" name="host" value={host} />
                  {host}
                </HostLabel>
              </HostData>
            );
          })}
        </ListBox>
      </HostList>
      <SelectButtons>
        <AllCancleBtn>초기화</AllCancleBtn>
        <ConfirmBtn>확인</ConfirmBtn>
      </SelectButtons>
    </>
  );
}

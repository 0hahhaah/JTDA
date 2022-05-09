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

const InfoText = styled.p`
  margin: 0;
  color: #999999;
  text-align: center;
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
  const [checkedItems, setCheckedItems] = useState([]);
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
  const [bChecked, setChecked] = useState(false);

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

  const onCheckedItemHandler = () => {
    console.log("조회");
    //잘못생각했음. 밑에거 아니고~
    //버튼 누르면 api 요청 보내는거
    // if (isChecked) {
    //   checkedItems.add(id);
    //   setCheckedItems(checkedItems);
    // } else if (!isChecked && checkedItems.has(id)) {
    //   checkedItems.delete(id);
    //   setCheckedItems(checkedItems);
    // }
    // console.log("dd", checkedItems);
  };

  const checkHandler = ({ target }) => {
    setChecked(!bChecked);
    onCheckedItemHandler(data.id, target.checked);
  };

  const onResetHandler = () => {
    console.log("초기화");
    checkedItems.map((e, i) => {});
    //checkedItems 혹은 data의 checked를 다 false로
  };

  useEffect(() => {
    getHosts();
  }, []);

  return (
    <>
      <SelectedHost>
        <ListTitle>선택한 Host</ListTitle>
        <ListBox>
          {checkedItems.length === 0 ? (
            <InfoText>
              조회할 host를
              <br />
              선택해주세요
            </InfoText>
          ) : (
            <ul>
              {checkedItems.map((e, i) => {
                return <li key={i}>{e}</li>;
              })}
            </ul>
          )}
        </ListBox>
      </SelectedHost>

      <HostList>
        <ListTitle>Host List</ListTitle>
        <ListBox>
          {data.map((host, i) => {
            return (
              <HostData>
                <HostLabel>
                  <HostCheckBox
                    type="checkbox"
                    name="host"
                    value={host}
                    key={i}
                    checked={bChecked}
                    onChange={(e) => {
                      setChecked(e.target.value.checked);
                      setCheckedItems([...checkedItems, e.target.value]);
                      console.log(checkedItems);
                      //여기까진 됐고 이제 체크해제하면 지워져야됨,
                    }}
                  />
                  {host}
                </HostLabel>
              </HostData>
            );
          })}
        </ListBox>
      </HostList>
      <SelectButtons>
        <AllCancleBtn onClick={onResetHandler}>초기화</AllCancleBtn>
        <ConfirmBtn onClick={onCheckedItemHandler}>조회</ConfirmBtn>
      </SelectButtons>
    </>
  );
}

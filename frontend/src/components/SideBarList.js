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
  font-size: 13px;
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

const baseUrl = "http://k6s102.p.ssafy.io:8081/";

export default function SidebarList({ searchInput }) {
  const [hostsList, setHostsList] = useState([]);
  const [startAt, setStartAt] = useState("2022-05-10");
  const [endAt, setEndAt] = useState("2022-05-10");
  const [query, setQuery] = useState(searchInput);
  // const [checkedList, setCheckedList] = useState<Array<any> | null>(null);
  const [checkedItems, setCheckedItems] = useState([]);
  // const [bChecked, setChecked] = useState(true);

  const getHosts = async () => {
    await axios({
      url:
        baseUrl +
        `host/search?startAt=${startAt}&endAt=${endAt}&query=${query}`,
      method: "get",
    })
      .then((res) => {
        console.log(res.data.hosts);
        setHostsList([...res.data.hosts]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onRemoveItems = (e) => {
    setCheckedItems(checkedItems.filter((item) => item !== e.target.value));
  };

  const onCheckedItemHandler = () => {
    console.log("조회");
    //버튼 누르면 api 요청 보내기
  };

  const onResetHandler = () => {
    setCheckedItems([]);
  };

  useEffect(() => {
    getHosts();
  }, [startAt, endAt, query]);

  useEffect(() => {
    setQuery(searchInput);
  }, [searchInput]);

  return (
    <>
      <SelectedHost>
        <ListTitle>선택한 Host</ListTitle>
        <ListBox>
          {console.log(checkedItems)}
          {checkedItems.length === 0 ? (
            <InfoText>조회할 host를 선택해주세요</InfoText>
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
        <ListTitle>Host List ({hostsList.length})</ListTitle>
        <ListBox>
          {/* {console.log("호스트결과", hostsList)} */}
          {hostsList.map((host, i) => {
            return (
              <HostData>
                <HostLabel>
                  <HostCheckBox
                    type="checkbox"
                    name="host"
                    value={host.hostName}
                    key={i}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCheckedItems([...checkedItems, e.target.value]);
                        e.target.checked = true;
                      } else {
                        onRemoveItems(e);
                        e.target.checked = false;
                      }
                    }}
                  />
                  {host.hostName}
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

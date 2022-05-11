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
  margin-top: 15px;
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

const NoneCheckBox = styled.input`
  display: none;
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

const baseUrl = "http://k6s102.p.ssafy.io/api/";

const charToUnicode = (str) => {
  if (!str) return false;
  let unicode = "";
  for (let i = 0, l = str.length; i < l; i++) {
    unicode += "%" + str[i].charCodeAt(0).toString(16);
  }
  return unicode;
};

export default function SidebarList({ searchInput }) {
  const [hostsList, setHostsList] = useState([]);
  const [startAt, setStartAt] = useState("2022-05-10");
  const [endAt, setEndAt] = useState("2022-05-10");
  const [query, setQuery] = useState(searchInput);
  const [checkedItems, setCheckedItems] = useState([]);

  const getHosts = async () => {
    await axios({
      url:
        baseUrl +
        `host/search?startAt=${startAt}&endAt=${endAt}&query=${encodeURIComponent(
          query
        )}`,
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
    // setCheckedItems([]);
    console.log("초기화");
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
                  &nbsp;{host.hostName}
                </HostLabel>
              </HostData>
            );
          })}
        </ListBox>
      </HostList>
      <SelectButtons>
        <AllCancleBtn as="div">
          <HostLabel>
            <NoneCheckBox
              type="checkbox"
              name="host"
              onChange={(e) => console.log(e.target)}
            />
            초기화
          </HostLabel>
        </AllCancleBtn>
        <ConfirmBtn onClick={onCheckedItemHandler}>조회</ConfirmBtn>
      </SelectButtons>
    </>
  );
}

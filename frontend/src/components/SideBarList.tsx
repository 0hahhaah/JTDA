import { useEffect, useState } from "react";
import { hostInfo } from "../interfaces/HostInfo.interface";
import { URL } from '../api'
import axios from "axios";
import styled from "styled-components";
import TagCard from "./TagCard";
import Clusters from "./Clusters";

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TagBox = styled(Center)``;

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
const ClusterList = styled(HostList)`
`;

const ToggledHost = styled.div`
  background-color: red;
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

const baseUrl = "https://k6s102.p.ssafy.io/api";

interface Props {
  searchInput: string;
  searchCategory : string;
  startAt?: Date | null | undefined;
  endAt?: Date | null | undefined;
}

export default function SidebarList({searchInput, searchCategory, startAt, endAt}: Props) {
  const [hostsList, setHostsList] = useState<Array<string>>([]);
  // const [startAt, setStartAt] = useState("2022-05-10");
  // const [endAt, setEndAt] = useState("2022-05-10");
  const [query, setQuery] = useState(searchInput);
  const [checkedItems, setCheckedItems] = useState<Array<string>>([""]);
  const tags = ["Monitoring", "Database", "Frontend", "Backend", "WebService"];
  const [checkedTags, setCheckedTags] = useState<Array<string>>([""]);
  // const [clusterList, setClusterList] = useState<any>([]);
  const [checkedHosts, setCheckedHosts] = useState<Array<string>>([]);
  const [checkedCluster, setCheckedCluste] = useState<string>("");
  const clusterList: string[] = ['cluster1', 'cluster2', 'cluster3'];
  const checkedTagsTest: string[] = ['tag1', 'tag2', 'tag3'];

  //encodeURIComponent(query); 유니코드 변환 함수

  const getAPI = async() => {
    const startStr = startAt
    ?.toISOString()
    .replace("T", " ")
    .substring(0, 19);
    const endStr = endAt
    ?.toISOString()
    .replace("T", " ")
    .substring(0, 19);

    await axios({
      url: baseUrl + `/host/list?startAt=${startStr}&endAt=${endStr}&cluster=${clusterList}&tags=${checkedTags}`,
      method: "get",
    })
    .then((res) => {
      console.log('fff', res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  const getHosts = async () => {
    const startStr = startAt
    ?.toISOString()
    .replace("T", " ")
    .substring(0, 19);
    const endStr = endAt
    ?.toISOString()
    .replace("T", " ")
    .substring(0, 19);

      await axios({
          url:
            baseUrl +
            `/host/search?startAt=${startStr}&endAt=${endStr}&query=${encodeURIComponent(query)}`,
            method: "get",
      })
      .then((res) => {
        console.log('dd',res.data);
        setHostsList([...res.data.hosts]);
      })
      .catch((err) => {
          console.log(err);
        });
    };

    const checkedTagsHandler = (code:string, isChecked:boolean) => {
      if(isChecked){
        setCheckedTags([...checkedTags, code])
      } else if(!isChecked && checkedTags.find(one => one === code)){
        const filter = checkedItems.filter(one => one !== code)
        setCheckedTags([...filter])
      }
    }

  const onRemoveItems = (e:any) => {
    setCheckedItems(checkedItems.filter((item) => item !== e.target.value));
  };

  const onCheckedItemHandler = () => {
    console.log("조회");
    //버튼 누르면(X) 옵션 선택하면(O) api 요청 보내기
  };

  const onResetHandler = () => {
    // setCheckedItems([]);
    console.log("초기화");
  };

  useEffect(() => {
    getAPI();
    getHosts();
  }, [startAt, endAt, query]); //변수 추가되어야 함

  useEffect(() => {
    setQuery(searchInput);
  }, [searchInput]);

  return (
    <>
      <TagBox>
        <ListTitle>Tags</ListTitle>
        <TagCard 
          tags={tags} 
          checkedTags={checkedTags}
          checkedTagsHandler={checkedTagsHandler}
        ></TagCard>
      </TagBox>

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

      {/* <HostList>
        <ListTitle>Host List ({hostsList.length})</ListTitle>
        <ListBox>
          {hostsList.map((host:hostInfo, i) => {
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
      </HostList> */}

      <ClusterList>
          <ListTitle>Clusters</ListTitle>
          <ListBox>
            {clusterList.map((cluster, i) => {
              return (
                <Clusters 
                  cluster={cluster}
                  key={i}>
                </Clusters>
              )
            })}
          </ListBox>
      </ClusterList>
      {/* <SelectButtons>
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
      </SelectButtons> */}
    </>
  );
}

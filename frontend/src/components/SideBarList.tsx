import { useEffect, useState } from "react";
import { hostInfo } from "../interfaces/HostInfo.interface";
import { URL } from "../api";
import axios from "axios";
import styled from "styled-components";
import TagCard from "./TagCard";
import Clusters from "./Clusters";
import changeTime from "./ChangeTimeForm";
const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TagBox = styled(Center)`
  margin-bottom: 10px;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
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

const HostList = styled(HostBox)`
  height: 40%;
`;

const ListTitle = styled.div`
  margin: 5px;
  margin-bottom: 10px;
  font-weight: 500;
`;

//--------------------------------
const ClusterList = styled(HostList)`
  max-height: 60%;
`;

const baseUrl = "https://k6s102.p.ssafy.io/api";

interface Props {
  searchInput: string;
  searchCategory: string;
  category?: string;
  pointAt?: Date|null;
  startAt?: Date|null;
  endAt?: Date|null;
}

export default function SidebarList({
  searchInput,
  searchCategory,
  startAt,
  endAt,
  pointAt,
  category,
}: Props) {
  const [hostsList, setHostsList] = useState<Array<string>>([]);
  const [query, setQuery] = useState(searchInput);
  const [tags, setTags] = useState<Array<string>>([]);
  const [checkedTags, setCheckedTags] = useState<Array<string>>([]);
  const [clusterList, setClusterList] = useState<Array<string>>([]);
  const [checkedCluster, setCheckedCluster] = useState<string>("");
  const [checkedHosts, setCheckedHosts] = useState<Array<string>>([]);

  const [startStr, setStartStr] = useState<string>("");
  const [endStr, setEndStr] = useState<string>("");

  //encodeURIComponent(query); 유니코드 변환 함수
  //searchCategory 값에 따라 (host, cluster)
  //host면 getHosts(); xx searchHost();
  //cluster면 getAPI();

  const setTime = () => {
    if (category === "point"&&pointAt) {
      setStartStr(changeTime(pointAt));
      setEndStr(changeTime(pointAt));
    } else {
      if(startAt) setStartStr(changeTime(startAt));
      if(endAt) setEndStr(changeTime(endAt));
    }
  };

  const getAPI = async () => {
    await axios({
      url:
        baseUrl +
        `/host/list?startAt=${startStr}&endAt=${endStr}&cluster=${checkedCluster}&tags=${checkedTags}`,
      method: "get",
    })
      .then((res) => {
        console.log("ㅇㅇ", res.data.results);
        setClusterList(res.data.results);
        // console.log('?',hostsList);
        // console.log('list', res.data.searchInput.cluster);
        // setClusterList([...res.data.searchInput.cluster]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTags = async () => {
    await axios({
      url: baseUrl + `/host/tag?startAt=${startStr}&endAt=${endStr}`,
      method: "get",
    })
    .then((res) => {
      setTags([...res.data.tags]);
    })
    .catch((err) => {
      console.log(err);
    });

    await tagRemoveBlank();
  };
  
  const tagRemoveBlank = () => { //태그 맨 앞에 생기는 공백 제거
    setTags(tags.filter(element => element !== ''));
  }

  const searchAPI = async() => { //검색창 사용. 근데 이제 클러스터 검색이 잘될지 모르겠네
    let searchUrl = "";
    if(searchCategory === "cluster"){
      searchUrl = `/host/list?startAt=${startStr}&endAt=${endStr}&query=${query}` //cluster 검색때는 host/list
    } else if(searchCategory === "host"){
      searchUrl = `/host/search?startAt=${startStr}&endAt=${endStr}&query=${query}`; //host 검색때는 search
    }
    await axios({
      url: baseUrl + searchUrl,
      method: "get",
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    })
  }  


  const checkedTagsHandler = (code: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedTags([...checkedTags, code]);
    } else if (!isChecked && checkedTags.find((one) => one === code)) {
      const filter = checkedTags.filter((one) => one !== code);
      setCheckedTags([...filter]);
    }
  };
  
  useEffect(() => {
    setTime();
  }, [pointAt, startAt, endAt]);

  useEffect(()=>{
    getTags();
  }, [startStr, endStr]);

  useEffect(() => {
    // getAPI();
  }, [startStr, endStr, checkedTags]); //변수 추가되어야 함

  useEffect(() => {
    // searchHosts();
  }, [startAt, endAt, query]);

  useEffect(() => {
    setQuery(searchInput);
  }, [searchInput]);

  return (
    <>
      <TagBox>
        <ListTitle>Tags</ListTitle>
        <TagList>
          {tags.length === 0
            ? "조회시점을 선택해주세요"
            : tags.map((tag) => {
                return (
                  <TagCard
                    key={tag}
                    tag={tag}
                    checkedTags={checkedTags}
                    checkedTagsHandler={checkedTagsHandler}
                  />
                );
              })}
        </TagList>
      </TagBox>

      {/* <SelectedHost>
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
      </SelectedHost> */}

      <ClusterList>
        <ListTitle>Clusters</ListTitle>
        <ListBox>
          {clusterList.map((cluster, i) => {
            return (
              <Clusters
                key={i}
                cluster={cluster}
                setCheckedCluster={setCheckedCluster}
              ></Clusters>
            );
          })}
        </ListBox>
      </ClusterList>
    </>
  );
}

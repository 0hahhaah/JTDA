import { useEffect, useState } from "react";
import { Cluster } from "../interfaces/HostInfo.interface";
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
  margin-bottom: 5px;
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
  height: 75%;
`;

const baseUrl = "https://k6s102.p.ssafy.io/api";

interface Props {
  searchInput: string;
  searchCategory: string;
  category?: string;
  pointAt?: Date | null;
  startAt?: Date | null;
  endAt?: Date | null;
  selectedHostNames?: string[];
  setSelectedHostNames?: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SidebarList({
  searchInput,
  searchCategory,
  startAt,
  endAt,
  pointAt,
  category,
  selectedHostNames,
  setSelectedHostNames,
}: Props) {
  const [query, setQuery] = useState(searchInput);
  const [tags, setTags] = useState<Array<string>>([]);
  const [checkedTags, setCheckedTags] = useState<Array<string>>([]);
  const [clusterList, setClusterList] = useState<Cluster[]>([]);
  const [checkedCluster, setCheckedCluster] = useState<string>("");
  const [startStr, setStartStr] = useState<string>("");
  const [endStr, setEndStr] = useState<string>("");

  const setTime = () => {
    if (category === "point" && pointAt) {
      setStartStr(changeTime(pointAt));
      setEndStr(changeTime(pointAt));
    } else {
      if (startAt) setStartStr(changeTime(startAt));
      if (endAt) setEndStr(changeTime(endAt));
    }
  };

  const getAPI = async() => {
    await axios({
      url:
        URL +
        `/api/host/list?startAt=${startStr}&endAt=${endStr}&cluster=${checkedCluster}&tags=${checkedTags}`,
      method: "get",
    })
      .then((res) => {
        setClusterList(res.data.results);
      })
      .catch((err) => {
      });
  };

  const getTags = async () => {
    await axios({
      url: URL + `/api/host/tag?startAt=${startStr}&endAt=${endStr}`,
      method: "get",
    })
      .then((res) => {
        removeTagBlank(res.data.tags);
      })
      .catch((err) => {
      });
  };

  const removeTagBlank = (tagList: string[]) => {
    //태그 맨 앞에 생기는 공백 제거
    setTags(tagList.filter((e) => e));
  };

  const searchAPI = async () => { //검색창 사용
    if (searchCategory === "cluster") {
      await axios({
        url: URL + `/api/host/list?startAt=${startStr}&endAt=${endStr}&cluster=${query}`,
        method: "get"
      })
      .then((res) =>{
        setClusterList(res.data.results);
        setCheckedCluster(query);
      })
      .catch((err) =>{
      })
    } else if (searchCategory === "host") {
      await axios({
        url: URL + `/api/host/search?startAt=${startStr}&endAt=${endStr}&query=${encodeURIComponent(query)}`,
        method: "get"
      })
      .then((res) =>{
        if(setSelectedHostNames)
          setSelectedHostNames(res.data.hosts.map((host: { host: any; }) => host.host));
      })
      .catch((err) =>{
      })
    }
  }  

  const checkedTagsHandler = (code: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedTags([...checkedTags, code]);
      if(setSelectedHostNames) setSelectedHostNames([]);
    } else if (!isChecked && checkedTags.find((one) => one === code)) {
      const filter = checkedTags.filter((one) => one !== code);
      setCheckedTags([...filter]);
      if(setSelectedHostNames) setSelectedHostNames([]);
    }
  };

  useEffect(() => {
    setTime();
  }, [pointAt, startAt, endAt]);

  useEffect(() => {
    getTags();
  }, [startStr, endStr]);

  useEffect(() => {
    getAPI();
  }, [startStr, endStr, checkedCluster, checkedTags]);

  useEffect(() => {
    setQuery(searchInput);
  }, [searchInput]);

  useEffect(() =>{
    searchAPI();
  },[query]);

  return (
    <>
      <TagBox>
        <ListTitle>Tags</ListTitle>
        <TagList>
          {tags.length === 0
            ? "조회기간을 선택해주세요"
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

      <ClusterList>
        <ListTitle>Clusters</ListTitle>
        <ListBox>
          {clusterList.map((cluster, i) => {
            return (
              <Clusters
                key={i}
                cluster={cluster}
                selectedHostNames={selectedHostNames}
                setSelectedHostNames={setSelectedHostNames}
              ></Clusters>
            );
          })}
        </ListBox>
      </ClusterList>
    </>
  );
}

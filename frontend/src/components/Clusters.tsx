import { useState } from "react";
import { Cluster } from "../interfaces/HostInfo.interface";
import CheckHost from "./CheckHost";
import styled from "styled-components";

const ClusterBox = styled.p<{ ftWeight: string }>`
  margin: 0 0 5px 0;
  padding: 0 0 0 20px;
  cursor: pointer;
  font-weight: ${(props) => (props.ftWeight === "true" ? "500" : "normal")};
`;

const HostUl = styled.ul`
  margin: 5px 0 10px 0;
`;

interface Props {
  cluster: Cluster;
  selectedHostNames?: string[];
  setSelectedHostNames?: React.Dispatch<React.SetStateAction<string[]>>;
}

const Clusters: React.FunctionComponent<Props> = ({
  cluster,
  selectedHostNames,
  setSelectedHostNames,
}: Props) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const onClusterHandler = () => { //클러스터 내 호스트 전체 선택
    setIsToggled(!isToggled);
    if(!isToggled && selectedHostNames && setSelectedHostNames) {
      setSelectedHostNames([...selectedHostNames,...cluster.hosts.map((hosts) => hosts.host)]);
    } else if(isToggled && selectedHostNames && setSelectedHostNames) {
      //다시 누르면(토글 닫으면) 해당 클러스터 내의 호스트들 전부 선택 해제
      // console.log(cluster.hosts.map((host) => host.host));
    }
  };

  const selectedHostHandler = (code: string, isChecked: boolean) => {
    if(selectedHostNames && setSelectedHostNames){
      if(isChecked) {
        setSelectedHostNames([...selectedHostNames, code]);
      } else if (!isChecked && selectedHostNames.find((one) => one === code)){
        const filter = selectedHostNames.filter((one) => one !== code);
        setSelectedHostNames([...filter]);
      }
  }
  }

  //테스트용입니다
  const reset = () =>{
    if(setSelectedHostNames){
      setSelectedHostNames([]);
    }
  };

  return (
    <>
      <ClusterBox ftWeight={`${isToggled}`} onClick={onClusterHandler}>
        {cluster.cluster} ({cluster.hosts.length})
      </ClusterBox>
      {isToggled ? (
        <HostUl>
          {cluster.hosts.map((host, i) => {
            return (
              <CheckHost
                key={i}
                host={host}
                selectedHostNames={selectedHostNames}
                selectedHostHandler={selectedHostHandler}
              ></CheckHost>);
          })}
        </HostUl>
      ) : null}
      <button onClick={reset}>oo</button>
    </>
  );
};

export default Clusters;

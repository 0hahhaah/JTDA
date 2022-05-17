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

const HostList = styled.li`
  list-style: none;
  margin: 3px 0;
  cursor: pointer;
  font-weight: ${props => props.color === "true" ? "500" : "normal"};
  color: ${props => props.color === "true" ? "#5F0080" : "#333333"};
`;

interface Props {
  cluster: Cluster;
  selectedHostNames?: string[];
  setSelectedHostNames?: React.Dispatch<React.SetStateAction<string[]>>;
}

const Clusters: React.FunctionComponent<Props> = ({
  cluster,
  selectedHostNames,
  setSelectedHostNames
}: Props) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const onClusterHandler = () => {
    setIsToggled(!isToggled);
    if(!isToggled && selectedHostNames && setSelectedHostNames){
      setSelectedHostNames([...selectedHostNames,...cluster.hosts.map((hosts) => hosts.host)]);
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

  const reset =() =>{
    if(setSelectedHostNames){
      setSelectedHostNames([]);
    }
  }

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

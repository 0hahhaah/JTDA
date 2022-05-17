import { useState } from "react";
import { Cluster } from "../interfaces/HostInfo.interface";
import styled from "styled-components";
import id from "date-fns/esm/locale/id/index.js";

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
  margin: 3px 0;
  cursor: pointer;
`;

interface Props {
  cluster: Cluster;
  setCheckedCluster: React.Dispatch<React.SetStateAction<string>>;
  selectedHostNames?: string[];
  setSelectedHostNames?: React.Dispatch<React.SetStateAction<string[]>>;
}

const Clusters: React.FunctionComponent<Props> = ({
  cluster,
  setCheckedCluster,
  selectedHostNames,
  setSelectedHostNames
}: Props) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);

  const onClusterHandler = () => {
    setIsToggled(!isToggled);
    setCheckedCluster(cluster.cluster);
  };

  const onSelectedHostsHandler = async(host: string) => {
    if(selectedHostNames && setSelectedHostNames){
      setSelectedHostNames([...selectedHostNames, host]);
      if(selectedHostNames.includes(host)) {
        setSelectedHostNames(selectedHostNames.filter(e => e!== host));
      }
    }
  }

  //필터로 걸러낸다.. 있는애는 bold 없는애는 normal
  return (
    <>
      <ClusterBox ftWeight={`${isToggled}`} onClick={onClusterHandler}>
        {cluster.cluster} ({cluster.hosts.length})
      </ClusterBox>
      {isToggled ? (
        <HostUl>
          {cluster.hosts.map((host, i) => {
            return (
            <HostList 
              key={i}
              onClick={() => {onSelectedHostsHandler(host.host)}}>{host.host}
            </HostList>) ; 
          })}
        </HostUl>
      ) : null}
    </>
  );
};

export default Clusters;

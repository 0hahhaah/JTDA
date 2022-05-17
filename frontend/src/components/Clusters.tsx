import { useState } from "react";
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
  cursor: pointer;
`;

interface Props {
  cluster: string;
  setCheckedCluster: React.Dispatch<React.SetStateAction<string>>;
}

const Clusters: React.FunctionComponent<Props> = ({
  cluster,
  setCheckedCluster,
}: Props) => {
  const [isToggled, setIsToggled] = useState<boolean>(false);
  const hosts = ["host1", "host2", "host3", "host4"];

  const checkedClusterHosts = () => {};

  const onClusterHandler = () => {
    setIsToggled(!isToggled);
    // setCheckedCluster(cluster.cluster);
    setCheckedCluster('CLUSTER-ONE');
  };

  const onSelectedHostsHandler = (id: string) => {
  }

  return (
    <>
      <ClusterBox ftWeight={`${isToggled}`} onClick={onClusterHandler}>
        {cluster.cluster} ({cluster.host.length})
        {/* cluster.cluster (cluster.hosts.length) */}
      </ClusterBox>
      {isToggled ? (
        <HostUl>
          {cluster.hosts.map((host, i) => {
            return (
            <HostList 
              key={i}>ㅇㅇ
            </HostList>) ; //id로 바꿔야 함.
          })}
        </HostUl>
      ) : null}
    </>
  );
};

export default Clusters;

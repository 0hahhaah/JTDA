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
  // children: never[];
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
    setCheckedCluster(cluster);
  };

  return (
    <>
      <ClusterBox ftWeight={`${isToggled}`} onClick={onClusterHandler}>
        {cluster} ()
      </ClusterBox>
      {isToggled ? (
        <HostUl>
          {hosts.map((e, i) => {
            return <HostList key={i}>{e}</HostList>;
          })}
        </HostUl>
      ) : null}
    </>
  );
};

export default Clusters;

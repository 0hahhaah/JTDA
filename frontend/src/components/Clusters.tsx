import { useState } from 'react';
import styled from 'styled-components';

const ClusterBox = styled.p`
    margin: 0 0 5px 0;
    padding: 0 0 0 20px;
    cursor: pointer;
    font-weight: ${(props) => props.color === "true" ? "500" : "normal"};
`;

const HostUl = styled.ul`
    margin: 5px 0 10px 0;
`;
const HostList = styled.li`
    list-style: none;
    cursor: pointer;
`;

interface Props {
    children: never[];
    cluster: string;
    setCheckedCluster: React.Dispatch<React.SetStateAction<string>>;
}

const Clusters:React.FunctionComponent<Props> = (props: Props) => {
    const [isToggled, setIsToggled] = useState<boolean>(false);
    const hosts = ["host1", "host2", "host3", "host4"];
    
    const onClusterHandler = () =>{
        setIsToggled(!isToggled);
        setCheckedCluster(""); //왜,,,안될까? 나는 모르게쏘
    }

    return(
        <>
            <ClusterBox color={`${isToggled}`}onClick={onClusterHandler}>{props.cluster} ()</ClusterBox>
            {
                isToggled
                ? (<HostUl>
                   {hosts.map((e, i) =>{
                       return <HostList key={i}>{e}</HostList>
                   })} 
                </HostUl>)
                : null
            }
        </>
    );
}

export default Clusters;
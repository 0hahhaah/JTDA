import { useState } from 'react';
import styled from 'styled-components';

const ClusterBox = styled.p`
    margin: 0;
    padding: 0 0 0 20px;
    cursor: pointer;
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
}
const Clusters:React.FunctionComponent<Props> = (props) => {
    const [isToggled, setIsToggled] = useState<boolean>(false);
    const hosts = ["host1", "host2", "host3", "host4"];
    return(
        <>
            <ClusterBox onClick={()=>{setIsToggled(!isToggled)}}>{props.cluster} ({hosts.length})</ClusterBox>
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
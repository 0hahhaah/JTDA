import { Host } from '../interfaces/HostInfo.interface';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const List = styled.div`
    margin: 5px 0;
`;

const HostLabel = styled.label``;
const CheckBox = styled.input`
    accent-color: #5F0080;
    margin-right: 4px;
`;

interface Props {
 host: Host;
 selectedHostNames?: string[];
selectedHostHandler: (code: string, isChecked: boolean) => void
}

const CheckHost = ({
    host, 
    selectedHostNames, 
    selectedHostHandler,
    }:Props) =>{
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const onCheck=({target}:React.ChangeEvent<HTMLInputElement>) => {
        selectedHostHandler(target.value, target.checked);
        setIsChecked(target.checked);
    }

    useEffect(()=>{
        if(selectedHostNames){
            if(selectedHostNames.includes(host.host)){
                setIsChecked(true);
            } else {
                setIsChecked(false);
            }
        }
    }, []);

    return (
        <List>
            <HostLabel>
                <CheckBox 
                    type="checkbox"
                    checked={isChecked}
                    value={host.host} 
                    onChange={e=>onCheck(e)}
                    />
                {host.host}<br/>
            </HostLabel>
        </List>
    )
}

export default CheckHost;
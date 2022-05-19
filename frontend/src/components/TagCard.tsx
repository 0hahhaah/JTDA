import { useEffect, useState } from 'react';
import { Tags } from '../interfaces/HostInfo.interface';
import styled from 'styled-components';

const CheckBox = styled.input`
    display: none;
`;

const TagDiv = styled.div`
    cursor: pointer;
    padding: 5px 10px;
    background-color: white;
    border-radius: 17px;
    border: 1px solid #cdcdcd;
    margin: 3px;
    background-color: ${(props) => props.color === "true" ? "#5F0080" : "white"};
    color: ${(props) => props.color === "true" ? "white" : "#333333"};
`;

const TagCard = ({tag, checkedTags, checkedTagsHandler}: Tags) =>{
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const onCheck=({target}:React.ChangeEvent<HTMLInputElement>)=>{
        checkedTagsHandler(target.value, target.checked)
        setIsChecked(target.checked);
    }

    useEffect(() => {
        if(checkedTags.includes(tag)) {
            setIsChecked(true)
        } else {
            setIsChecked(false)
        }
    }, [checkedTags]);

    return (
        <label>
            <CheckBox type="checkbox" 
                name="tag"
                checked={isChecked}
                value={tag}
                onChange = { e => onCheck(e) }/>
            <TagDiv 
                color={`${isChecked}`}>{tag}</TagDiv> 
        </label>
    )
};

export default TagCard;
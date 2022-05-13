import { Checkbox } from '@mui/material';
import { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 10px;
`;

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
`;

interface Props{
    tags: string[];
    checkedTags: string[];
    checkedTagsHandler: any;
}

const TagCard = ({tags, checkedTags, checkedTagsHandler}: Props) =>{
    const [isChecked, setIsChecked] = useState<boolean>(false);

    const onCheck=({target}:any)=>{
        checkedTagsHandler(target.value)
        setIsChecked(target.checked);
    }

    return (
        <Container>
        {
            tags.map((tag, i) => {
                return (
                    <>
                    <label>
                        {/* <CheckBox type="checkbox" 
                            name="tag"
                            checked={isChecked}
                            value={tag}
                            key={i}
                            onChange = { (e) =>{
                                if(e.target.checked) setIsChecked(true);
                                else setIsChecked(false);
                            }}
                        />
                        <TagDiv>{tag}</TagDiv>  */}
                        <input
                            type='checkbox'
                            name='tag'
                            onChange={(e)=>{
                                onCheck(e)
                            }}/> {tag}
                    </label>
                    </>
                )
            })
        }
        </Container>
    );
};

export default TagCard;
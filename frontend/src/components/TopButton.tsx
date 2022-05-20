import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as UpArrow } from '../assets/arrow_upward.svg';

const Btn = styled.div`
    position: fixed;
    bottom: 4%;
    right: 3%;
    padding: 5px;
    border-radius: 50%;
    background-color: #cdcdcd;
    width: 42px;
    height: 42px;
    text-align: center;
    vertical-align: middle;
    cursor:pointer;
`;


const TopButton = () => {
    const [scroll, setScroll] = useState<boolean>(false);

    const scrollTop = () =>{ 
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    }

    const handleScroll = () => {
        if(window.scrollY >= 500){
            setScroll(true);
        } else {
            setScroll(false);
        }
    }
     
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return(
        <div onClick={scrollTop}>
            { scroll
                ? (
                    <Btn>
                        <UpArrow></UpArrow>
                    </Btn>
                )
                : null
            }
        </div>
    )
}

export default TopButton;
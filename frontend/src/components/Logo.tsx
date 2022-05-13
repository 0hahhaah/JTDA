import styled from 'styled-components';

const LogoBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    `;

const LogoImage = styled.img`
    width: 80%;
    cursor: pointer;
`;

export const Logo = () => {
    const onHomeClick = () => {
        window.location.replace('/');
    };
    return(
        <LogoBox>
            <LogoImage src="logo.png" alt="JTDA" onClick={onHomeClick}/>
        </LogoBox>
    )
}
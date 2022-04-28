import styled from 'styled-components';

declare module 'styled-components'{

}

const Container= styled.div`
    width: fit-content;
`;

const Title = styled.p`
    margin: 5px 0 5px 10px;
    font-size: 20px; 
    text-align: left;
`;

const Block = styled.div`
    display: inline-block;
    margin: 10px;
    width: 120px;
    height: 120px;
    background-color: lightgray;
`;

const ThreadState = styled.p`
    margin: 0;
    padding: 10px;
    font-size: 14px;
`;

const StateNum = styled.span`
    font-size: 40px;
`;

function StateCount(){
    const date: Date = new Date();

    return(
        <Container>
            <Title>00월00일 00:00 Thread State</Title>
            <Block>
                <ThreadState>총 Thread 수</ThreadState>
                <StateNum>53</StateNum>
            </Block>
            <Block>
                <ThreadState>BLOCKED</ThreadState>
                <StateNum>53</StateNum>
            </Block>
            <Block>
                <ThreadState>RUNNABLE</ThreadState>
                <StateNum>53</StateNum>
            </Block>
            <Block>
                <ThreadState>WAITING</ThreadState>
                <StateNum>53</StateNum>
            </Block>
            <Block>
                <ThreadState>TIMED_WAITING</ThreadState>
                <StateNum>53</StateNum>
            </Block>
        </Container>
    )
}

export default StateCount;
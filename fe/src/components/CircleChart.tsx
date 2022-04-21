import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2"; 

const Title = styled.p`
    font-size: 20px;
    margin: 5px 0;
`;

const Box = styled.div`
    width: 300px;
    height: 300px;
`;
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Blocked', 'Runnable', 'Waiting', 'Timed_waiting'],
    datasets: [
        {
            label: "# of Threads",
            data: [23, 14, 4, 7],
            backgroundColor:[
                "rgba(255, 102, 99, 0.6)",
                "rgba(158, 224, 158, 0.6)",
                "rgba(253, 253, 151, 0.6)",
                "rgba(254, 177, 68, 0.6)",
            ],
        }
    ]
}

function CircleChart(){
     
    return(
        <Box>
            <Title>Thread State %</Title>
            <Pie
                data={data}/>
        </Box>
    )
}

export default CircleChart;
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChartComponent = ({ teamResults, resultTeamName }) => {
    const data = {
        labels: ['Thắng', 'Thua', 'Hòa'],
        datasets: [
            {
                label: `Kết quả cho đội : ${resultTeamName}`,
                data: [teamResults.wins, teamResults.losses, teamResults.draws],
                backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            },
        ],
    };

    return (
        <div className='chartOver text-l border-2 border-black p-4 rounded-3xl flex flex-col justify-center'>
            <p className='text-center'>Kết quả cho đội bóng:
                <span className='bold text-red-500 mx-2'>
                    {resultTeamName}
                </span>
            </p>
            <Pie data={data} />
        </div>
    );
};

export default PieChartComponent;

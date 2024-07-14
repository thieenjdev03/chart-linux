// GoalsChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { calculateGoals } from '../../utils/goalProcessor'; // Đảm bảo đường dẫn chính xác

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const GoalsChart = ({ matches }) => {
    const goals = calculateGoals(matches);

    const labels = Object.keys(goals);
    const dataValues = Object.values(goals);

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Số bàn thắng',
                data: dataValues,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (tooltipItem) {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
                    }
                }
            }
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Đội',
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Số bàn thắng',
                }
            }
        }
    };

    return (
        <>
            <h1 className="text-3xl text-red-700 font-bold text-center">Danh sách đội, số trận thắng và số trận thua trong của các đội</h1 >
            <Bar data={data} options={options} />;
        </>
    )
};

export default GoalsChart;

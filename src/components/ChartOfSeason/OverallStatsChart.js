// OverallStatsChart.js
import { React, useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import { calculateOverallStats } from '../../utils/overallStatsProcessor'; // Đảm bảo đường dẫn chính xác
import Header from '../Header';
import Footer from '../Footer';
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const OverallStatsChart = () => {
    const [values, setValues] = useState([]);
    useEffect(() => {
        localStorage.getItem('values') && setValues(JSON.parse(localStorage.getItem('values')));
    });

    const overallStats = calculateOverallStats(values);

    const data = {
        labels: ['Thắng', 'Thua', 'Hòa'],
        datasets: [
            {
                label: 'Số trận',
                data: [overallStats.wins, overallStats.losses, overallStats.draws],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
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
                    text: 'Loại kết quả',
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Số trận',
                }
            }
        }
    };

    return (
        <div className='flex flex-col justify-center items-center'>
            <Header />
            <div className="w-2/3 px-16 py-8 flex flex-col items-center">
                <h1 className="text-3xl text-red-700 font-bold">Thống kê kết quả tất cả trận đấu của giải</h1>
                <Bar data={data} options={options} />
            </div>
            <Footer></Footer>
        </div>)
};

export default OverallStatsChart;

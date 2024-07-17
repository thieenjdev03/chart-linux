import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
// Sample data (replace with actual data fetching)
const values = localStorage.getItem('storageKey');
const FootballChart = () => {
    const [selectedStage, setSelectedStage] = useState(null);
    const [values, setValues] = useState([]);

    useEffect(() => {
        // Fetch data from localStorage or replace with actual data fetching
        const storedValues = localStorage.getItem('storageKey');
        if (storedValues) {
            setValues(JSON.parse(storedValues));
        } else {
            // For testing, use sample data if localStorage is empty
            setValues(values);
        }
    }, []);

    // Generate unique stages and stage options
    const stages = values.map(item => item.stage);
    const uniqueStages = [...new Set(stages)];
    const stageOptions = uniqueStages.map(stage => ({
        value: stage,
        label: stage
    }));

    // Set default selected stage if options are available
    useEffect(() => {
        if (stageOptions.length > 0 && selectedStage === null) {
            setSelectedStage(stageOptions[0]);
        }
    }, [stageOptions, selectedStage]);
    useEffect(() => {
        localStorage.getItem('storageKey') && setValues(JSON.parse(localStorage.getItem('storageKey')));
        console.log(values);
    });
    // Handle change in Select component
    const onOptionStageChange = (option) => {
        setSelectedStage(option);
    };

    // Calculate wins and losses for each team in the selected stage
    const calculateTeamStats = () => {
        if (!selectedStage) return [];

        const filteredMatches = values.filter(match => match.stage === selectedStage.value);
        const teamStats = {};

        filteredMatches.forEach(match => {
            const [score1, score2] = match.score.split(' - ').map(Number);
            if (score1 > score2) {
                teamStats[match.team1] = {
                    wins: (teamStats[match.team1]?.wins || 0) + 1,
                    losses: teamStats[match.team1]?.losses || 0,
                    draws: teamStats[match.team1]?.draws || 0
                };
                teamStats[match.team2] = {
                    wins: teamStats[match.team2]?.wins || 0,
                    losses: (teamStats[match.team2]?.losses || 0) + 1,
                    draws: teamStats[match.team2]?.draws || 0
                };
            } else if (score2 > score1) {
                teamStats[match.team1] = {
                    wins: (teamStats[match.team1]?.wins || 0),
                    losses: (teamStats[match.team1]?.losses || 0) + 1,
                    draws: teamStats[match.team1]?.draws || 0
                };
                teamStats[match.team2] = {
                    wins: (teamStats[match.team2]?.wins || 0) + 1,
                    losses: teamStats[match.team2]?.losses || 0,
                    draws: teamStats[match.team2]?.draws || 0
                };
            } else {
                // Draw
                teamStats[match.team1] = {
                    wins: teamStats[match.team1]?.wins || 0,
                    losses: teamStats[match.team1]?.losses || 0,
                    draws: (teamStats[match.team1]?.draws || 0) + 1
                };
                teamStats[match.team2] = {
                    wins: teamStats[match.team2]?.wins || 0,
                    losses: teamStats[match.team2]?.losses || 0,
                    draws: (teamStats[match.team2]?.draws || 0) + 1
                };
            }
        });

        const sortedTeams = Object.entries(teamStats).map(([team, stats]) => ({
            team,
            wins: stats.wins,
            losses: stats.losses,
            draws: stats.draws

        })).sort((a, b) => b.wins - a.wins);
        return sortedTeams;
    };

    const teamStats = calculateTeamStats();

    // Prepare data for chart
    const chartData = {
        labels: teamStats.map(({ team }) => team),
        datasets: [
            {
                label: 'Số trận thắng',
                data: teamStats.map(({ wins }) => wins),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Số trận thua',
                data: teamStats.map(({ losses }) => losses),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: 'Số trận hòa',
                data: teamStats.map(({ draws }) => draws),
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            }
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return `${context.label}: ${context.raw} trận ${context.dataset.label}`;
                    }
                }
            }
        },
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            }
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full justify-center items-center">
            <div className="flex gap-6 w-2/3">
                <Select
                    className="w-1/2"
                    options={stageOptions}
                    value={selectedStage}
                    onChange={onOptionStageChange}
                />
            </div>
            {selectedStage && (
                <div className="mt-4 w-3/4 gap-2 flex flex-col">
                    <h1 className="text-3xl text-red-700 font-bold text-center">Danh sách đội, số trận thắng và số trận thua trong {selectedStage.label}</h1>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            )}
        </div>
    );
};

export default FootballChart;
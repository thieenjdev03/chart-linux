import React, { useEffect, useState } from "react";
import Select from 'react-select';
import CsvToJson from '../../utils';
import PieChartComponent from "./PieChartComponent";

const FootballChart = () => {
    const [values, setValues] = useState([]);
    const [selectedTeams, setSelectedTeams] = useState([]);

    const onOptionChange = (options) => {
        setSelectedTeams(options);
    };

    // Sử dụng Set để đảm bảo tên đội bóng là duy nhất
    const teams = new Set();
    values.forEach(match => {
        teams.add(match.team1);
        teams.add(match.team2);
    });

    // Chuyển đổi Set thành mảng
    const uniqueTeams = Array.from(teams);
    const teamOptions = uniqueTeams.map((team, index) => ({
        value: index,
        label: team
    }));

    function calculateResults(values) {
        const results = {};

        values.forEach(match => {
            const team1 = match.team1;
            const team2 = match.team2;
            const score = match.score;

            if (!results[team1]) {
                results[team1] = { wins: 0, losses: 0, draws: 0 };
            }
            if (!results[team2]) {
                results[team2] = { wins: 0, losses: 0, draws: 0 };
            }

            if (score === "vs") {
                return;
            }

            const [score1, score2] = score.split(" - ").map(Number);

            if (score1 > score2) {
                results[team1].wins += 1;
                results[team2].losses += 1;
            } else if (score1 < score2) {
                results[team1].losses += 1;
                results[team2].wins += 1;
            } else {
                results[team1].draws += 1;
                results[team2].draws += 1;
            }
        });
        localStorage.setItem('values', JSON.stringify(values));
        return results;
    }

    // Tính toán kết quả cho tất cả các đội bóng
    const allResults = calculateResults(values);
    return (
        <div className="flex flex-col gap-6 text-center w-full justify-center items-center">
            <h1 className="text-3xl text-red-700 font-bold">Thống kê tỷ lệ thắng của các đội bóng</h1>
            <CsvToJson onDataLoaded={(data) => setValues(data)} />
            <div className="w-1/3 justify-center items-center">
                <Select
                    closeMenuOnSelect={true}
                    value={(selectedTeams == null) ? teamOptions[0] : selectedTeams}
                    options={teamOptions}
                    onChange={onOptionChange}
                    placeholder="Select teams"
                    isMulti
                />
            </div>
            <div className="flex flex-col gap-6 font-bold w-full">
                <div className="wrap w-full flex flex-wrap gap-10 font-normal">
                    {selectedTeams.map((team, index) => {
                        const teamResults = allResults[team.label] || { wins: 0, losses: 0, draws: 0 };
                        return (
                            <PieChartComponent
                                key={index}
                                resultTeamName={team.label}
                                teamResults={teamResults}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default FootballChart;

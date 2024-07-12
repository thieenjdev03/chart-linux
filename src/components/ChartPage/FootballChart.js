import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import React, { useState, useEffect } from 'react'; // Thêm useState
import CsvToJson from '../../utils';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FootballChart = (props) => {


    const [chartData, setChartData] = useState(null);
    const [jsonData, setJsonData] = useState(null); // Thêm state để lưu jsonData
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    const theme = useTheme();
    const [teamName, setTeamName] = React.useState([]);


    function getStyles(team, teamName, theme) {
        return {
            fontWeight:
                teamName.indexOf(team) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }
    const teamOptions = [
        'Arsenal', 'Aston Villa', 'Bournemouth', 'Brighton', 'Burnley',
        'Chelsea', 'Crystal Palace', 'Everton', 'Leicester', 'Liverpoo'
    ]
    const handleDataLoaded = (data) => {
        setJsonData(data); // Cập nhật jsonData từ callback
    };
    console.log(jsonData)
    const handleFilterByTeam = (team) => {
        const teamData = jsonData.filter((item) => item.team === team);
        const teamGoals = teamData.reduce((total, item) => total + parseInt(item.goals), 0);
        return { name: team, value: teamGoals };
    };
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setTeamName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };
    return (
        <>
            <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
                <Select
                    multiple
                    displayEmpty
                    value={teamName}
                    onChange={handleChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <em>Placeholder</em>;
                        }

                        return selected.join(', ');
                    }}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem disabled value="">
                        <em>Placeholder</em>
                    </MenuItem>
                    {teamOptions.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, teamName, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <CsvToJson onDataLoaded={handleDataLoaded} />
        </>
    );
};

export default FootballChart;

import { React, useEffect, useState } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Chart from './Chart';
import CsvToJson from '../../utils';
import GoalsChart from './GoalsChart';
function ChartPerStage(props) {
    const [values, setValues] = useState([]); 
    useEffect(() => {
        localStorage.getItem('storageKey') && setValues(JSON.parse(localStorage.getItem('storageKey')));
        console.log(values);
    });
    console.log = () =>{}

    return (
        <div>
            <Header />
            <div className="wrapper justify-center items-center gap-6">
                <h1 className="text-3xl text-red-700 font-bold text-center">Thống kê số trận thắng, thua và hòa theo các vòng bảng</h1>
                <Chart></Chart>
                <GoalsChart matches={values} />
            </div>
            <Footer />
        </div>
    );
}

export default ChartPerStage;
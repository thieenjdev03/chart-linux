import { React, useEffect, useState } from 'react';
import FootballChart from './FootballChart'; // Đảm bảo đường dẫn đến file đúng
import Header from '../Header';
import Footer from '../Footer';
import GoalsChart from './GoalsChart';
function ChartPerTeamPage(props) {
    const [values, setValues] = useState([]); 
    useEffect(() => {
        localStorage.getItem('storageKey') && setValues(JSON.parse(localStorage.getItem('storageKey')));
        console.log(values);
    });
    console.log = () =>{}

    return (
        <div>
            <Header />
            <div className="wrapper gap-4">
                <FootballChart />
                <GoalsChart matches={values} />
            </div>
            <Footer />
        </div>
    );
}

export default ChartPerTeamPage;
import { React, useEffect, useState } from 'react';
import FootballChart from './FootballChart'; // Đảm bảo đường dẫn đến file đúng
import Header from '../Header';
import Footer from '../Footer';
import GoalsChart from './GoalsChart';
function ChartPerTeamPage(props) {
    const [values, setValues] = useState([]); // Dữ liệu từ file CSV
    useEffect(() => {
        localStorage.getItem('values') && setValues(JSON.parse(localStorage.getItem('values')));
        console.log(values);
    });
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
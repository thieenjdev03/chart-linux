import React from 'react';
import FootballChart from './FootballChart'; // Đảm bảo đường dẫn đến file đúng
import Header from '../Header';
import Footer from '../Footer';

function ChartPerTeamPage(props) {
    return (
        <div>
            <Header />
            <div className="wrapper">
                <FootballChart />
            </div>
            <Footer />
        </div>
    );
}

export default ChartPerTeamPage;
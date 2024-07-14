import React from 'react';
import ChartPerTeamPage from './components/ChartPage'; // Đảm bảo đường dẫn đến file đúng
import ChartPerStage from './components/ChartPerStage'; // Đảm bảo đường dẫn đến file đúng
import { BrowserRouter, Routes, Route } from "react-router-dom";
import OverallStatsChart from './components/ChartOfSeason/OverallStatsChart'; // Đảm bảo đường dẫn đến file đúng
import Information from './components/Information'; // Đảm bảo đường dẫn đến file đúng
const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ChartPerTeamPage />} />
        <Route path="/ChartPerTeamPage" element={
          <ChartPerTeamPage />
        } />
        <Route path="/ChartPerStage" element={<ChartPerStage />} />
        <Route path="/MatchStatics" element={<OverallStatsChart />} />
        <Route path="/information" element={<Information />} />
      </Routes>
    </BrowserRouter >

  );
};

export default App;

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ChartPerTeamPage from './components/ChartPage';
import ChartPerStage from './components/ChartPerStage';
import OverallStatsChart from './components/ChartOfSeason/OverallStatsChart';
import Information from './components/Information';
import GoogleSheetsApi from './components/GoogleSheetAPI';

const App = () => {
  const [sheetData, setSheetData] = useState([]);

  const handleDataFetch = (data) => {
    setSheetData(data);
  };

  return (
    <BrowserRouter>
      <GoogleSheetsApi onDataFetch={handleDataFetch} />
      <Routes>
        <Route index element={<ChartPerTeamPage data={sheetData} />} />
        <Route path="/ChartPerTeamPage" element={<ChartPerTeamPage data={sheetData} />} />
        <Route path="/ChartPerStage" element={<ChartPerStage data={sheetData} />} />
        <Route path="/MatchStatics" element={<OverallStatsChart data={sheetData} />} />
        <Route path="/information" element={<Information data={sheetData} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App

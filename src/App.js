import React from 'react';
import ChartPerTeamPage from './components/ChartPage'; // Đảm bảo đường dẫn đến file đúng
import ChartPerStage from './components/ChartPerStage'; // Đảm bảo đường dẫn đến file đúng
import ChartPerGroup from './components/ChartPerGroup'; // Đảm bảo đường dẫn đến file đúng
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<ChartPerTeamPage />} />
        <Route path="/ChartPerTeamPage" element={<ChartPerTeamPage />} />
        <Route path="/ChartPerStage" element={<ChartPerStage />} />
        <Route path="/ChartPerGroup" element={<ChartPerGroup />} />
      </Routes>
    </BrowserRouter >
  );
};

export default App;

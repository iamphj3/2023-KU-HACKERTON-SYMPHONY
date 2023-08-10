import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from './src/pages/HomePage';
import ResultPage from './src/pages/ResultPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;

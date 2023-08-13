import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { RecoilRoot } from 'recoil';
import HomePage from './src/pages/HomePage';
import ResultPage from './src/pages/ResultPage';

function Router() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default Router;

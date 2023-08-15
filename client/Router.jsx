import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { RecoilRoot } from 'recoil';
import HomePage from './src/pages/HomePage';
import ResultPage from './src/pages/ResultPage';
import ErrorPage from './src/pages/ErrorPage';

function Router() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default Router;

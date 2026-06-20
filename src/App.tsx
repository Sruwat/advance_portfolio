import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { FounderPortfolio } from './FounderPortfolio';
import './portfolio.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FounderPortfolio />} />
        <Route path="/project/:projectId" element={<FounderPortfolio />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PaymentPage from './components/PaymentPage'; // Import the Payment component
import EventDashboard from './components/UserEventDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventDashboard />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
};

export default App;

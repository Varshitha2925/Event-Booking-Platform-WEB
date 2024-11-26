import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import EventDashboard from './components/OrganizerDashboard';
import AdminPage from './components/Admin';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* *<Route path="/" element={<EventDashboard />} /> */}
        {/* <Route path="/payment" element={<PaymentPage />} />
        <Route path="/" element={<EventDashboard />} /> */}
        <Route path="/" element={<AdminPage />} />
      </Routes>
    </Router>
  );
};

export default App;

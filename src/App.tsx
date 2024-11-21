import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import EventDashboard from './components/UserEventDashboard';
import EventDashboard from './components/OrganizerDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<EventDashboard />} />
        <Route path="/payment" element={<PaymentPage />} /> */}
        <Route path="/" element={<EventDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;

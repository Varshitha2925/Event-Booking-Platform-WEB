import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UserEventDashboard from './components/UserEventDashboard';

// import AdminPage from './components/Admin';
import LoginPage from './components/login';
import PaymentPage from './components/PaymentPage';
import RegisterPage from './components/register';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        *<Route path="/dashboard" element={<UserEventDashboard />} />
        <Route path="/payment/:bookingId" element={<PaymentPage />} />
        {/* <Route path="/" element={<EventDashboard />} /> */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>
  );
};

export default App;

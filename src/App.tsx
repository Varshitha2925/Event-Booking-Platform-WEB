import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UserEventDashboard from './components/UserEventDashboard';

// import AdminPage from './components/Admin';
import LoginPage from './components/login';
import MyBookingsPage from './components/MyBookingsPage';
import EventDashboard from './components/OrganizerDashboard';
import PaymentPage from './components/PaymentPage';
import RegisterPage from './components/register';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        *<Route path="/dashboard" element={<UserEventDashboard />} />
        <Route path="/payment/:bookingId" element={<PaymentPage />} />
        <Route path="/organizer-dashboard" element={<EventDashboard />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/my-bookings" element={<MyBookingsPage />} />
      </Routes>
    </Router>
  );
};

export default App;

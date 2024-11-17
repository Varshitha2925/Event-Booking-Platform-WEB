import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import EventOrganizerDashboard from './components/EventOrganizerDashboard'; // import the new component

// // You can add other imports for your pages as needed
// import Home from './components/Home'; // example Home page
// import NotFound from './components/NotFound'; // example 404 page

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <h1>Event Booking Platform</h1>
        
        {/* Define Routes here */}
        <Routes>
      
          
          {/* Event Organizer Dashboard route */}
          <Route path="/" element={<EventOrganizerDashboard />} />
          
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;

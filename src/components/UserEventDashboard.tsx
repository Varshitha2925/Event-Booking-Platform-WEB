import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
// import { events } from "./mockData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './UserEventDashboard.css';

const UserEventDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [events, setevent] = useState<any[]>([]);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    fetchEvents()
  }, []);
  console.log("userId", userId)

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users/events');
      setevent(response.data);
      console.log("events",response.data)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    
  };
  const handleMyBookings = () => {
    navigate('/my-bookings'); // Navigate to the desired route
  };
  const logOut = () => {
    navigate('/')
  }

  return (
    <div className="user-dashboard">
      <h1>Events</h1>
      <button onClick={handleMyBookings} className="my-bookings-btn">My Bookings</button>
      <button onClick={logOut} className="logout-btn">Log Out</button>
      <div className="event-list">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default UserEventDashboard;

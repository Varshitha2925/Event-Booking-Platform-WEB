import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
// import { events } from "./mockData";
import axios from "axios";

const UserEventDashboard: React.FC = () => {
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

  return (
    <div className="user-dashboard">
      <h1>Events</h1>
      <div className="event-list">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default UserEventDashboard;

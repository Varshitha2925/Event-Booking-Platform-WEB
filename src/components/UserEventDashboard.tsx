import React from "react";
import EventCard from "./EventCard";
import { events } from "./mockData";

const UserEventDashboard: React.FC = () => {
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

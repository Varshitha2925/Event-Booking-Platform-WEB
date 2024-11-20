import React, { useState } from "react";
import EventManagementModal from "./EventManagementModal";
import { events } from "./mockData";
import './styles.css';
const OrganizerDashboard: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="organizer-dashboard">
      <h1>My Events</h1>
      <button onClick={() => setShowModal(true)}>Create Event</button>
      {showModal && <EventManagementModal onClose={() => setShowModal(false)} />}
      <div className="event-list">
        {events.map((event) => (
          <div key={event._id} className="organizer-event">
            <h3>{event.title}</h3>
            <button>Edit</button>
            <button>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrganizerDashboard;

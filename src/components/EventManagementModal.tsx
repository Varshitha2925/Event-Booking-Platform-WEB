import React, { useState } from "react";
import './styles.css';
interface EventManagementModalProps {
  onClose: () => void;
}

const EventManagementModal: React.FC<EventManagementModalProps> = ({ onClose }) => {
  const [eventData, setEventData] = useState({
    title: "",
    location: "",
    capacity: 0,
    date: "",
    duration: 0,
    type: "paid",
    ticketPrice: 0,
  });

  const handleSubmit = () => {
    alert("Event Created: " + JSON.stringify(eventData));
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Event</h2>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Location"
          onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
        />
        <input
          type="number"
          placeholder="Capacity"
          onChange={(e) => setEventData({ ...eventData, capacity: Number(e.target.value) })}
        />
        <input
          type="date"
          onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
        />
        <input
          type="number"
          placeholder="Duration (hrs)"
          onChange={(e) => setEventData({ ...eventData, duration: Number(e.target.value) })}
        />
        <select
          onChange={(e) => setEventData({ ...eventData, type: e.target.value })}
        >
          <option value="paid">Paid</option>
          <option value="free-limited">Free Limited</option>
          <option value="free-unlimited">Free Unlimited</option>
        </select>
        <input
          type="number"
          placeholder="Ticket Price"
          onChange={(e) => setEventData({ ...eventData, ticketPrice: Number(e.target.value) })}
        />
        <button onClick={handleSubmit}>Create Event</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default EventManagementModal;

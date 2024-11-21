import React, { useEffect, useState } from 'react';
import './CreateEventForm.css';

interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  capacity: number;
  ticketsSold: number;
  eventType: string;
}

interface CreateEventPopupProps {
  onClose: () => void;
  onCreate: (event: Event) => void;
  eventToEdit?: Event | null;
}

const CreateEventPopup: React.FC<CreateEventPopupProps> = ({
  onClose,
  onCreate,
  eventToEdit,
}) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [eventType, setEventType] = useState('Paid');

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setLocation(eventToEdit.location);
      setDate(eventToEdit.date);
      setCapacity(eventToEdit.capacity);
      setEventType(eventToEdit.eventType);
    }
  }, [eventToEdit]);

  const handleSubmit = () => {
    const newEvent: Event = {
      id: eventToEdit ? eventToEdit.id : Math.random().toString(36).substr(2, 9),
      title,
      location,
      date,
      capacity,
      ticketsSold: eventToEdit ? eventToEdit.ticketsSold : 0,
      eventType,
    };
    onCreate(newEvent);
  };

  return (
    <div className="create-event-popup">
      <div className="popup-content">
        <h2>{eventToEdit ? 'Edit Event' : 'Create Event'}</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Capacity:
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          />
        </label>
        <label>
          Event Type:
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="Paid">Paid</option>
            <option value="Free Limited">Free Limited</option>
            <option value="Free Unlimited">Free Unlimited</option>
          </select>
        </label>
        <div className="popup-buttons">
          <button onClick={handleSubmit}>{eventToEdit ? 'Edit' : 'Create'}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPopup;

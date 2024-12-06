import React, { useEffect, useState } from 'react';
import './CreateEventForm.css';

// interface Event {
//   id: string;
//   title: string;
//   location: string;
//   date: string;
//   capacity: number;
//   ticketsSold: number;
//   eventType: string;
// }
 interface Event {
  id:string,
  organizerId: any,
  title: string,
  location: string,
  capacity: number,
  date: string,
  duration: number, // in hours
  type: string,
  price: number,
  ticketSold: number
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
  const [enddate, setendDate] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [type, setEventType] = useState('Paid');
  const [price, setPrice] = useState(0);
  const [duration, setduration] = useState(0);

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setLocation(eventToEdit.location);
      setDate(eventToEdit.date);
      setduration(eventToEdit.duration);
      setCapacity(eventToEdit.capacity);
      setEventType(eventToEdit.type);
      setPrice(eventToEdit.price);
    }
  }, [eventToEdit]);

  const handleSubmit = () => {
    const newEvent: Event = {
      id: eventToEdit ? eventToEdit.id : Math.random().toString(36).substr(2, 9),
      title,
      location,
      date,
      capacity,
      ticketSold: eventToEdit ? eventToEdit.ticketSold : 0,
      organizerId: '',
      duration,
      price,
      type,
      
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
          Duration(in hours):
          <input
            type="number"
            value={duration}
            onChange={(e) => setduration(Number(e.target.value))}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
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
            value={type}
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

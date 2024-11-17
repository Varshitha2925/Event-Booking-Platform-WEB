import React, { useState } from 'react';
import Modal from 'react-modal';
import "./CreateEventModal.css";

// TypeScript interface for the event data
interface Event {
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  ticketPrice: number;
  ticketLimit: number | null;
  eventType: 'paid' | 'free-limited' | 'free-unlimited';
}

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateEvent: (eventData: Event) => void;
}

const CreateEventModal: React.FC<CreateEventModalProps> = ({ isOpen, onClose, onCreateEvent }) => {
  const [eventData, setEventData] = useState<Event>({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    ticketPrice: 0,
    ticketLimit: null,
    eventType: 'paid',
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateEvent(eventData); // Send event data to the parent component
    onClose(); // Close modal after submission
  };

  return (
    
    <Modal isOpen={isOpen} onRequestClose={onClose} ariaHideApp={false}>
      <div  className='Form'>
      <h2>Create New Event</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Event Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={eventData.location}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            name="time"
            value={eventData.time}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="ticketPrice">Ticket Price:</label>
          <input
            type="number"
            id="ticketPrice"
            name="ticketPrice"
            value={eventData.ticketPrice}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="ticketLimit">Ticket Limit:</label>
          <input
            type="number"
            id="ticketLimit"
            name="ticketLimit"
            value={eventData.ticketLimit ?? ''}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="eventType">Event Type:</label>
          <select
            id="eventType"
            name="eventType"
            value={eventData.eventType}
            onChange={handleInputChange}
          >
            <option value="paid">Paid</option>
            <option value="free-limited">Free (Limited)</option>
            <option value="free-unlimited">Free (Unlimited)</option>
          </select>
        </div>

        <button type="submit">Create Event</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
      </div>
    </Modal>
  );
};

export default CreateEventModal;

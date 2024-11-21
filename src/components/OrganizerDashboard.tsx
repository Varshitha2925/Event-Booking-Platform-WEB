import React, { useState } from 'react';
import CreateEventPopup from './CreateEventForm';
import OrganizerEventCard from './OrganiserEventCard';
import './OrganizerDashboard.css';

interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  capacity: number;
  ticketsSold: number;
  eventType: string;
}

const OrganizerDashboard: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Tech Conference',
      location: 'San Francisco',
      date: '2024-12-10',
      capacity: 100,
      ticketsSold: 50,
      eventType: 'Paid',
    },
    {
      id: '2',
      title: 'Music Festival',
      location: 'Los Angeles',
      date: '2024-12-15',
      capacity: 200,
      ticketsSold: 180,
      eventType: 'Free Limited',
    },
  ]);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);

  const handleCreateEvent = (newEvent: Event) => {
    if (eventToEdit) {
      // Editing an existing event
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === eventToEdit.id ? newEvent : event))
      );
    } else {
      // Creating a new event
      setEvents((prevEvents) => [...prevEvents, newEvent]);
    }
    setEventToEdit(null);
    setIsPopupVisible(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
  };

  const handleEditEvent = (event: Event) => {
    setEventToEdit(event);
    setIsPopupVisible(true);
  };

  return (
    <div className="organizer-dashboard">
      <div className="dashboard-header">
        <h1>My Events</h1>
        <button
          className="create-event-button"
          onClick={() => {
            setEventToEdit(null); // Reset edit state
            setIsPopupVisible(true);
          }}
        >
          Create Event
        </button>
      </div>

      <div className="event-list">
        {events.map((event) => (
          <OrganizerEventCard
            key={event.id}
            event={event}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent} bookings={[]}          />
        ))}
      </div>

      {isPopupVisible && (
        <CreateEventPopup
          onClose={() => setIsPopupVisible(false)}
          onCreate={handleCreateEvent}
          eventToEdit={eventToEdit}
        />
      )}
    </div>
  );
};

export default OrganizerDashboard;

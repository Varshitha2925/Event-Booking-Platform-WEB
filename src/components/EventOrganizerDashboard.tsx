import React, { useState } from 'react';
import CreateEventModal from './CreateEventModal'; // Import modal component
import "./EventOrganizerDashboard.css";

const EventOrganizerDashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [events, setEvents] = useState<any[]>([]); // This is where event data will be stored

  // Open the modal
  const openModal = () => setIsModalOpen(true);

  // Close the modal
  const closeModal = () => setIsModalOpen(false);

  // Handle event creation
  const handleCreateEvent = (eventData: any) => {
    // Normally, you would make an API call to create the event
    // For now, we will just add it to the events list
    setEvents((prevEvents) => [...prevEvents, eventData]);
    console.log('Created Event:', eventData);
  };

  return (
    <div>
      <h1>Event Organizer Dashboard</h1>

      {/* Button to trigger the modal */}
      <button onClick={openModal}>Create Event</button>

      {/* List of events */}
      <h2>Your Events</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event.title} - {event.date} {event.time}</li>
        ))}
      </ul>

      {/* Modal for creating event */}
      <CreateEventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onCreateEvent={handleCreateEvent}
      />
    </div>
  );
};

export default EventOrganizerDashboard;

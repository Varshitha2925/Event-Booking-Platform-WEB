import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CreateEventPopup from './CreateEventForm';
import OrganizerEventCard from './OrganiserEventCard';
import './OrganizerDashboard.css';

// interface Event {
//   id: string;
//   title: string;
//   location: string;
//   date: string;
//   capacity: number;
//   ticketsSold: number;
//   type: string;
interface Event {
  id:any,
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
  

const OrganizerDashboard: React.FC = () => {

  const [events, setevent] = useState<any[]>([]);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
  const userId = localStorage.getItem("organizerId");
  ;
  
  useEffect(() => {
    
    fetchEvents()
  }, []);

  const fetchEvents = async () => {
    try {
      console.log("userID", userId)
      const response = await axios.get(`http://localhost:3001/api/events/getevents/${userId}`);
      
      setevent(response.data);
      console.log("events",response.data)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    
  };

  const handleCreateEvent = async (newEvent: Event) => {
    if (eventToEdit) {
      // Creating a new event
      console.log("newEvent" , newEvent)
      // setevent((prevEvents) => [...prevEvents, newEvent]);
      try {
        newEvent.organizerId = userId
        console.log("userID", userId)
        console.log("newEvent", newEvent)
        const response = await axios.put(`http://localhost:3001/api/events/${newEvent.id}`,{
          newEvent
        });
        console.log("DATA" , response.data)
        
        // setevent(response.data);
        console.log("events",response.data)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
      
    } else {
      // Creating a new event
      console.log("newEvent" , newEvent)
      // setevent((prevEvents) => [...prevEvents, newEvent]);
      try {
        newEvent.organizerId = userId
        console.log("userID", userId)
        console.log("newEvent", newEvent)
        const response = await axios.post('http://localhost:3001/api/events',{
          newEvent
        });
        console.log("DATA" , response.data)
        
        // setevent(response.data);
        console.log("events",response.data)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    }
    setEventToEdit(null);
    setIsPopupVisible(false);
  };

  const handleDeleteEvent = async (eventId: string) => {
    // setevent((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
    const response = await axios.delete(`http://localhost:3001/api/events/${eventId}`);
    console.log("DATA" , response.data)
  };

  const handleEditEvent = (event: Event) => {
    setEventToEdit(event);
    setIsPopupVisible(true);
  };

  return (
    <div className="organizer-dashboard">
      <div className="dashboard-header">
        <h1> My Events </h1>
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
            key={event.organizerId}
            event={event}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent} bookings={[]} />
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

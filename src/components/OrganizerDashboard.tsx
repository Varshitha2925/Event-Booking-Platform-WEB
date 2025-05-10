import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  id:string,
  organizerId: any,
  title: string,
  location: string,
  capacity: number,
  startdate: string,
  enddate: string,
  startTime: string,
  endTime:string,
  duration: string, // in hours
  type: string,
  price: number,
  ticketSold: number,
  register: string
}

interface Organizer {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  ssn: string
}
  

const OrganizerDashboard: React.FC = () => {
  const navigate = useNavigate();

  const [events, setevent] = useState<any[]>([]);
  const [organizer, setorganizer] = useState<Organizer[]>([])

  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [ssn, setssn] = useState('')

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<Event | null>(null);
  const userId = localStorage.getItem("organizerId");
  const [isProfileVisible, setPopupVisible] = useState(false);

  
  useEffect(() => {
    
    fetchEvents()
    fetchOrganizer()
  }, []);

  const fetchEvents = async () => {
    try {
      console.log("userID", userId)
      const response = await axios.get(`http://localhost:3001/api/events/getevents/${userId}`);
      console.log("response Events",response.data)
      
      setevent(response.data);
      console.log("events",response.data)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    
  };

  const fetchOrganizer = async () => {
    try {
      console.log("userID", userId)
      const response = await axios.get(`http://localhost:3001/api/auth/organizer/${userId}`);
      
      setorganizer(response.data);
      setfirstName(response.data.firstName)
      setLastName(response.data.lastName)
      setemail(response.data.email)
      setphone(response.data.phone)
      setssn(response.data.ssn)
      console.log("organizer",response.data)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    
  };

  const handleCreateEvent = async (newEvent: Event) => {
    if (newEvent.startTime && newEvent.endTime) {
      const startDate = new Date(`1970-01-01T${newEvent.startTime}:00`);
      const endDate = new Date(`1970-01-01T${newEvent.endTime}:00`);

      const diff = (endDate.getTime() - startDate.getTime()) / 1000 / 60; // Difference in minutes
      if (diff >= 0) {
        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;
        newEvent.duration = `${hours} hour(s) and ${minutes} minute(s)`;
      } else {
        newEvent.duration = "End time must be after start time";
      }
    } else {
      newEvent.duration = "";
    }
    console.log("Duration", newEvent.duration)
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
        navigate(0)
        // setevent(response.data);
        // console.log("events",response.data)
      } catch (error) {
        console.error('Error fetching users:', error);
      }
      
    } else {
      // Creating a new event
      console.log("newEvent" , newEvent)
      // setevent((prevEvents) => [...prevEvents, newEvent]);
      try {
        newEvent.organizerId = userId
        // console.log("userID", userId)
        // console.log("newEvent", newEvent)
        const response = await axios.post('http://localhost:3001/api/events',{
          newEvent
        });
        console.log("DATA" , response.data)
        navigate(0)
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
    await axios.delete(`http://localhost:3001/api/events/${eventId}`);
    console.log("DATA")
    navigate(0)
  };

  const handlePopupClose = () => setPopupVisible(false);
  

  const handleEditEvent = (event: Event) => {
    setEventToEdit(event);
    setIsPopupVisible(true);
  };

  const handleSubmit = async () => {
    try {
      console.log("userID", userId)
      const response = await axios.post(`http://localhost:3001/api/auth/organizer/${userId}`,{
        firstName,
        lastName,
        email,
        phone,
        ssn
      });

      
      console.log("organizer",response.data)
      setPopupVisible(false)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    
  };

  const logOut = () => {
    navigate('/')
  }

  return (
    <div className="organizer-dashboard">
      
      <div className="dashboard-header">
        <h1> My Events </h1>
        <div className="dashboard-buttons">
        <button
          className="create-event-button"
          onClick={() => {
            setEventToEdit(null); // Reset edit state
            setIsPopupVisible(true);
          }}
        >
          Create Event
        </button>

        <button
          className="create-event-button"
          onClick={() => {
            setPopupVisible(true);
          }}
        >
          My Profile
        </button>
        
        
        <button onClick={logOut} className="logout-btn">Log Out</button>
        </div>

      </div>

      <div className="event-list">
        {events.map((event) => (
          <OrganizerEventCard
            key={event.organizerId}
            event={event}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent} 
            bookings={[]} />
        ))}
      </div>

      {isPopupVisible && (
        <CreateEventPopup
          onClose={() => setIsPopupVisible(false)}
          onCreate={handleCreateEvent}
          eventToEdit={eventToEdit}
        />
      )}
      {isProfileVisible && (
        <div className="popup-overlay" onClick={handlePopupClose}>
          <div
            className="popup-container"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
          >
        <h2>Organizer Profile</h2>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </label>
        <label>
          Phone:
          <input   
            type="text"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          />
        </label>
        <label>
          Social Security Number:
          <input   
            type="text"
            value={ssn}
            onChange={(e) => setssn(e.target.value)}
          />
        </label>
        
        <div className="popup-buttons">
          <button onClick={handleSubmit}>Edit</button>
          <button onClick={handlePopupClose}>Close</button>
        </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizerDashboard;

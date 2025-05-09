import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
// import { events } from "./mockData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './UserEventDashboard.css';

const UserEventDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [events, setevent] = useState<any[]>([]);
  const [isProfileVisible, setPopupVisible] = useState(false);

  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [ssn, setssn] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);
    fetchEvents()
    fetchUser()
  }, []);
  console.log("userId", userId)

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/users/events',{
        params:{
          startDate,
          endDate
        }
      });
      setevent(response.data);
      console.log("events",response.data)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    
  };
  const handleMyBookings = () => {
    navigate('/my-bookings'); // Navigate to the desired route
  };
  const logOut = () => {
    navigate('/')
  }

  const fetchUser = async () => {
    try {
      // console.log("userID", userId)
      const userId = localStorage.getItem("userId");
      const response = await axios.get(`http://localhost:3001/api/users/user/${userId}`);
      
      
      setfirstName(response.data.firstName)
      setLastName(response.data.lastName)
      setemail(response.data.email)
      setphone(response.data.phone)
      
      console.log("organizer",response.data)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    
  };

  const handleSubmit = async () => {
    try {
      console.log("userID", userId)
      const response = await axios.post(`http://localhost:3001/api/users/user/${userId}`,{
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

  // const handleDateChange = (e:any) => {
  //   if (e.target.name === "startDate") {
  //     setStartDate(e.target.value);
  //   } else if (e.target.name === "endDate") {
  //     setEndDate(e.target.value);
  //   }
  // };

  // Fetch events based on date range
  const handleFilter = async () => {
    console.log("OK")
    try {
      const response = await axios.get('http://localhost:3001/api/users/events', {
        params: { startDate, endDate },
      });
      console.log("response", response.data)
      setevent(response.data);
    } catch (error) {
      console.error("Error fetching filtered events:", error);
    }
  };

  const handlePopupClose = () => setPopupVisible(false);
  return (
    <div className="user-dashboard">
      
      <div className="header">
        <div className="logo">
          <h1>Book Your Event</h1>
        </div>
      
      <div className="actionButtons">
        
     
      <button onClick={handleMyBookings} className="my-bookings-btn">My Bookings</button>
      <button
          className="mybookings"
          onClick={() => {
            setPopupVisible(true);
          }}
        >
          My Profile
        </button>
      <button onClick={logOut} >Log Out</button>
      </div>
      </div>
      <div className="event-list">
        {events.map((event) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
      {isProfileVisible && (
        <div className="popup-overlay" onClick={handlePopupClose}>
          <div
            className="popup-container"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
          >
        <h2>User Profile</h2>
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

export default UserEventDashboard;

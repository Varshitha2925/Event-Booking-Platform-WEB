import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css'; // Add CSS styles for the admin page

// Admin Page Component
const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [organizers, setOrganizers] = useState<any[]>([])

  const navigate = useNavigate();

  const logOut = () => {
    navigate('/')
  }

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'events') fetchEvents();
    if (activeTab === 'bookings') fetchBookings();
    if (activeTab === 'payments') fetchPayments();
    if (activeTab === 'organizer') fetchOrganizers();
  }, [activeTab]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/users');
      setUsers(response.data.data);
      console.log("users",response.data.data )
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const deleteEvents = async (eventID:any) => {

    try {
      console.log("EVENTID" , eventID)
      const response = await axios.delete(`http://localhost:3001/api/admin/events/${eventID}`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }

    navigate(0);
    setActiveTab('events')

  }

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/bookings');
      console.log("bookings", response.data)
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/payment');
      console.log("payments",response.data);
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const fetchOrganizers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/organizer');
      console.log("organizers",response.data);
      setOrganizers(response.data);
      console.log("Organizer", response.data)
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  }
  const blockUser = async (user: any) => {
   
    if(user.blocked === "true"){
      try{
      const response = await axios.patch(`http://localhost:3001/api/admin/users/${user._id}/unblock`);
      console.log("Organizer", response.data)
      navigate(0)

    }catch (error){

    }}
    else{
      // console.log("Hey Block")
      try{
        const response = await axios.patch(`http://localhost:3001/api/admin/users/${user._id}`);

        console.log("Organizer", response.data)
        navigate(0)
  
      }catch (error){
  
      }

    }
    
  }

  return (
    
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <button onClick={logOut} className="logout-btn">Log Out</button>
      <div className="tabs">
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          Users
        </button>
        <button
          className={activeTab === 'events' ? 'active' : ''}
          onClick={() => setActiveTab('events')}
        >
          Events
        </button>
        <button
          className={activeTab === 'bookings' ? 'active' : ''}
          onClick={() => setActiveTab('bookings')}
        >
          Bookings
        </button>
        <button
          className={activeTab === 'payments' ? 'active' : ''}
          onClick={() => setActiveTab('payments')}
        >
          Payments
        </button>

        <button
          className={activeTab === 'organizer' ? 'active' : ''}
          onClick={() => setActiveTab('organizer')}
        >
          Organizers
        </button>
      </div>

      <div className="content">
        {activeTab === 'users' && (
          <div className="users-section">
            <h2>Users</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Statues</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.blocked === "true" ?"blocked":"unblocked" }</td>
                    <td>
                    {<div className="button-container">
                    <button className="primary-button" onClick={() => blockUser(user)}>{user.blocked === "true" ? "Verify":"Deverify"} </button>
                    {/* <button className="secondary-button">Unblock Event</button> */}
                    </div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'events' && (
          <div className="events-section">
            <h2>Events</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Capacity</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event._id}>
                    <td>{event._id}</td>
                    <td>{event.title}</td>
                    <td>{event.location}</td>
                    <td>{new Date(event.date).toLocaleDateString()}</td>
                    <td>{event.capacity}</td>
                    <td>{event.type}</td>
                    <td>
                    {<div className="button-container">
                    <button className="primary-button" onClick={() => deleteEvents(event.id)}>Remove Event</button>
                    </div>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'bookings' && (
          <div className="bookings-section">
            <h2>Bookings</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Event Name</th>
                  <th>User ID</th>
                  <th>No. of Seats</th>
                  <th>Prize</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking._id}</td>
                    <td>{booking.title}</td>
                    <td>{booking.userId}</td>
                    <td>{booking.no_of_tickets}</td>
                    <td>{booking.totalPrize}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'payments' && (
          <div className="payments-section">
            <h2>Payments</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>BookingID</th>
                  <th>Card Number</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td>{payment._id}</td>
                    <td>{payment.bookingId}</td>
                    <td>{payment.cardNumber}</td>
                    <td>{new Date(payment.date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {activeTab === 'organizer' && (
          <div className="users-section">
            <h2>Organizer</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  {/* <th>Actions</th> */}
                </tr>
              </thead>
              <tbody>
                {organizers.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>Organizer</td>
                    {/* <td>
                    {<div className="button-container">
                    <button className="primary-button">Block User</button>
                    <button className="secondary-button">Unblock Event</button>
                    </div>}
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;

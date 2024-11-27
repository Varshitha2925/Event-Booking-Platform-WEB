import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Admin.css'; // Add CSS styles for the admin page

// Admin Page Component
const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);

  // Fetch data based on active tab
  useEffect(() => {
    if (activeTab === 'users') fetchUsers();
    if (activeTab === 'events') fetchEvents();
    if (activeTab === 'bookings') fetchBookings();
    if (activeTab === 'payments') fetchPayments();
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

  const fetchBookings = async () => {
    try {
      const response = await axios.get('/api/admin/bookings');
      setBookings(response.data.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await axios.get('/api/admin/payments');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
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
                  <th>Role</th>
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
                    <td>{user.role}</td>
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
                  <th>Event ID</th>
                  <th>User ID</th>
                  <th>No. of Seats</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>{booking._id}</td>
                    <td>{booking.event_id}</td>
                    <td>{booking.user_id}</td>
                    <td>{booking.no_of_seats}</td>
                    <td>{new Date(booking.date).toLocaleDateString()}</td>
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
                  <th>User ID</th>
                  <th>Event ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment._id}>
                    <td>{payment._id}</td>
                    <td>{payment.user_id}</td>
                    <td>{payment.event_id}</td>
                    <td>${payment.amount.toFixed(2)}</td>
                    <td>{new Date(payment.date).toLocaleDateString()}</td>
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

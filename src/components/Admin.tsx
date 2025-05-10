import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('users');
  const [users, setUsers] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [organizers, setOrganizers] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const navigate = useNavigate();

  const logOut = () => {
    navigate('/');
  };

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

  const deleteEvents = async (eventID: any) => {
    try {
      await axios.delete(`http://localhost:3001/api/admin/events/${eventID}`);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/payment');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const fetchOrganizers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/admin/organizer');
      setOrganizers(response.data);
    } catch (error) {
      console.error('Error fetching organizers:', error);
    }
  };

  const blockUser = async (user: any) => {
    try {
      if (user.verified === "true") {
        console.log("blocking user");
        console.log(user._id);
        await axios.patch(`http://localhost:3001/api/admin/users/${user._id}/unblock`);
        navigate('/admin-dashboard');
      } else {
        await axios.patch(`http://localhost:3001/api/admin/users/${user._id}`);
        navigate('/admin-dashboard');
        
      }
      fetchUsers();
    } catch (error) {
      console.error('Error blocking/unblocking user:', error);
    }
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const currentData =
    activeTab === 'users'
      ? users.slice(indexOfFirstRecord, indexOfLastRecord)
      : activeTab === 'events'
      ? events.slice(indexOfFirstRecord, indexOfLastRecord)
      : activeTab === 'bookings'
      ? bookings.slice(indexOfFirstRecord, indexOfLastRecord)
      : activeTab === 'payments'
      ? payments.slice(indexOfFirstRecord, indexOfLastRecord)
      : organizers.slice(indexOfFirstRecord, indexOfLastRecord);

  const totalPages = Math.ceil(
    (activeTab === 'users'
      ? users.length
      : activeTab === 'events'
      ? events.length
      : activeTab === 'bookings'
      ? bookings.length
      : activeTab === 'payments'
      ? payments.length
      : organizers.length) / recordsPerPage
  );

  return (
    <div className="admin-page">
      
      {/* Tabs */}
      <div className="tabs">
        <h1>Admin Dashboard</h1>
        <div className="tabslot">
          <button className={activeTab === 'users' ? 'active' : ''} onClick={() => { setActiveTab('users'); setCurrentPage(1); }}>Users</button>
          <button className={activeTab === 'events' ? 'active' : ''} onClick={() => { setActiveTab('events'); setCurrentPage(1); }}>Events</button>
          <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => { setActiveTab('bookings'); setCurrentPage(1); }}>Bookings</button>
          <button className={activeTab === 'payments' ? 'active' : ''} onClick={() => { setActiveTab('payments'); setCurrentPage(1); }}>Payments</button>
          <button className={activeTab === 'organizer' ? 'active' : ''} onClick={() => { setActiveTab('organizer'); setCurrentPage(1); }}>Organizers</button>
          <button onClick={logOut} className="logout-btn">Log Out</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="content">
        <div className="data-table">

          {/* Active Tab Name */}
          <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} List</h2>

          {/* Table */}
          <table>
            <thead>
              <tr>
                {activeTab === 'users' && (<><th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone</th></>)}
                {activeTab === 'events' && (<><th>ID</th><th>Title</th><th>Location</th><th>Date</th><th>Capacity</th><th>Type</th><th>Actions</th></>)}
                {activeTab === 'bookings' && (<><th>ID</th><th>Event Name</th><th>User ID</th><th>No. of Seats</th><th>Prize</th></>)}
                {activeTab === 'payments' && (<><th>ID</th><th>Booking ID</th><th>Card Number</th><th>Date</th></>)}
                {activeTab === 'organizer' && (<><th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Phone</th><th>Status</th><th>Actions</th></>)}
              </tr>
            </thead>
            <tbody>
              {currentData.map((item: any) => (
                <tr key={item._id}>
                  {activeTab === 'users' && (
                    <>
                      <td>{item._id}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                    </>
                  )}
                  {activeTab === 'events' && (
                    <>
                      <td>{item._id}</td>
                      <td>{item.title}</td>
                      <td>{item.location}</td>
                      <td>{new Date(item.date).toLocaleDateString()}</td>
                      <td>{item.capacity}</td>
                      <td>{item.type}</td>
                      {/* <td><button onClick={() => deleteEvents(item._id)} className="primary-button">Remove Event</button></td> */}
                    </>
                  )}
                  {activeTab === 'bookings' && (
                    <>
                      <td>{item._id}</td>
                      <td>{item.title}</td>
                      <td>{item.userId}</td>
                      <td>{item.no_of_tickets}</td>
                      <td>{item.totalPrize}</td>
                    </>
                  )}
                  {activeTab === 'payments' && (
                    <>
                      <td>{item._id}</td>
                      <td>{item.bookingId}</td>
                      <td>{item.cardNumber}</td>
                      <td>{new Date(item.date).toLocaleDateString()}</td>
                    </>
                  )}
                  {activeTab === 'organizer' && (
                    <>
                      <td>{item._id}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.verified === "true" ? "Verified" : "Not Verified"}</td>
                      <td><button onClick={() => blockUser(item)} className="primary-button">{item.verified === "true" ? "De Verify" : "Verify"}</button></td>
                      
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={currentPage === index + 1 ? 'active' : ''}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
          </div>

        </div>
      </div>
      {/* Total Count with Circle */}
      <div className="total-count-container">
            {activeTab === 'users' && <>Total Users: <span className="count-badge">{users.length}</span></>}
            {activeTab === 'events' && <>Total Events: <span className="count-badge">{events.length}</span></>}
            {activeTab === 'bookings' && <>Total Bookings: <span className="count-badge">{bookings.length}</span></>}
            {activeTab === 'payments' && <>Total Payments: <span className="count-badge">{payments.length}</span></>}
            {activeTab === 'organizer' && <>Total Organizers: <span className="count-badge">{organizers.length}</span></>}
          </div>
    </div>
  );
};

export default AdminPage;

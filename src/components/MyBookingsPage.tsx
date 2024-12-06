import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './MyBookingsPage.css';

interface Booking {
  title: string;
  _id: string;
  eventId: string;
  userId: string;
  no_of_tickets: number;
  totalPrize: number;
  booking_status: string;
  createdAt: string;
}
interface Event {
  _id: string;
  id: string;
  organizerId: string,
  title: string,
  location: string,
  capacity: number,
  date: string,
  duration: number, // in hours
  type: string,
  price: number,
  ticketSold: number
}


const MyBookingsPage: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId');
  
  console.log()
  useEffect(() => {
    const fetchBookings = async () => {
      
      try {
        const response = await axios.get(`http://localhost:3001/api/users/bookings/${userId}`);
        setBookings(response.data.data);
        console.log("DATA", response.data.data)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [userId]);

  if (loading) {
    return <p>Loading your bookings...</p>;
  }

  return (
    <div className="my-bookings-page">
      <h1>My Bookings</h1>
      <table className="bookings-table">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>No. of Tickets</th>
            <th>Total Price</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{booking.title}</td>
              <td>{booking.no_of_tickets}</td>
              <td>${booking.totalPrize}</td>
              <td>{booking.booking_status}</td>
              <td>{new Date(booking.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookingsPage;

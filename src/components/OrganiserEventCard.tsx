import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import './OrganiserEventCard.css';

interface Booking {
  _id: string;
  eventId: string;
  userId: string;
  totalPrize: string;
  no_of_tickets: number;
  booking_status: string;
  paymentStatus: string;
}

interface Event {
  _id: string;
  id:string,
  organizerId: string,
  title: string,
  location: string,
  capacity: number,
  startdate: string,
  enddate: string,
  startTime:string,
  endTime: string,
  duration: string, // in hours
  type: string,
  price: number,
  ticketSold: number,
  register: string
}

interface OrganizerEventCardProps {
  event: Event;
  bookings: Booking[]; // Bookings data
  onEdit: (event: Event) => void;
  onDelete: (id: string) => void;
}

const OrganizerEventCard: React.FC<OrganizerEventCardProps> = ({
  event,
  bookings,
  onEdit,
  onDelete,
}) => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [events, setevent] = useState<Booking[]>();;

  // const eventBookings = bookings.filter((booking) => booking.eventId === event._id);

  const handlePopupClose = () => setPopupVisible(false);
  
  const getBookings = async (eventId: string) => {
    console.log("event",event)
    const response = await axios.get(`http://localhost:3001/api/events/booking/${eventId}`);
    console.log("response",response.data)
    setevent(response.data)
    setPopupVisible(true);
  };



  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>Location: {event.location}</p>
      <p>Start Date: {moment(event.startdate).format("MM/DD/YYYY")}</p>
      <p>End Date: {moment(event.enddate).format("MM/DD/YYYY")}</p>
      <p>Duration: {event.duration}</p>
      <p>Capacity: {event.capacity}</p>
      <p>Time: {event.startTime} - {event.endTime}</p>
      <p>Tickets Sold: {event.ticketSold}</p>
      <p>Type: {event.type}</p>
      <p>Price: {event.price}</p>
      <p>Register: {event.register}</p>
      <div className="card-buttons">
        <button onClick={() => onEdit(event)}>Edit</button>
        {/* <button onClick={() => onDelete(event.id)}>Delete</button> */}
        <button onClick={() => getBookings(event.id)}>Bookings</button>
      </div>

      {isPopupVisible && (
        <div className="popup-overlay" onClick={handlePopupClose}>
          <div
            className="popup-container"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
          >
            <h2>Bookings for {event.title}</h2>
            {events?(
              <table className="booking-table">
                <thead>
                  <tr>
                    {/* <th>Booking ID</th> */}
                    <th>User ID</th>
                    <th>Seats</th>
                    <th>Booking Date</th>
                    <th>Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                {events.map((booking) => (
                  <tr key={booking._id}>
                    {/* <td>{booking._id}</td> */}
                    <td>{booking.eventId}</td>
                    <td>{booking.userId}</td>
                    <td>{booking.no_of_tickets}</td>
                    <td>{booking.paymentStatus}</td>
                  </tr>
                ))}
                </tbody>
              </table>
            ) : (
              <p>No bookings available for this event.</p>
            )}
            <button className="close-popup-button" onClick={handlePopupClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizerEventCard;

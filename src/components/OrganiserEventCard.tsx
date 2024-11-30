import React, { useState } from 'react';
import './OrganiserEventCard.css';

interface Booking {
  id: string;
  eventId: string;
  userId: string;
  seats: number;
  bookingDate: string;
  paymentStatus: string;
}

interface Event {
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

  const eventBookings = bookings.filter((booking) => booking.eventId === event.id);

  const handlePopupClose = () => setPopupVisible(false);

  return (
    <div className="event-card">
      <h3>{event.title}</h3>
      <p>Location: {event.location}</p>
      <p>Date: {event.date}</p>
      <p>Capacity: {event.capacity}</p>
      <p>Tickets Sold: {event.ticketSold}</p>
      <p>Type: {event.type}</p>
      <div className="card-buttons">
        <button onClick={() => onEdit(event)}>Edit</button>
        <button onClick={() => onDelete(event.id)}>Delete</button>
        <button onClick={() => setPopupVisible(true)}>Bookings</button>
      </div>

      {isPopupVisible && (
        <div className="popup-overlay" onClick={handlePopupClose}>
          <div
            className="popup-container"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
          >
            <h2>Bookings for {event.title}</h2>
            {eventBookings.length > 0 ? (
              <table className="booking-table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>User ID</th>
                    <th>Seats</th>
                    <th>Booking Date</th>
                    <th>Payment Status</th>
                  </tr>
                </thead>
                <tbody>
                  {eventBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.userId}</td>
                      <td>{booking.seats}</td>
                      <td>{booking.bookingDate}</td>
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

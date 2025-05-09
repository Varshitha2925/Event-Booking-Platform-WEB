import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './BookEventPopup.css';

interface BookEventPopupProps {
  event: {
    id: string;
    organizerId: string;
    title: string;
    location: string;
    capacity: number;
    startdate: string;
    enddate: string;
    duration: number;
    type: string;
    price: number;
    ticketSold: number;
  };
  onClose: () => void;
}

const BookEventPopup: React.FC<BookEventPopupProps> = ({ event, onClose }) => {
  const [seats, setSeats] = useState(1);
  const navigate = useNavigate();

  const handleBooking = async () => {
    try {
      const booking = {
        eventId: event.id,
        title: event.title,
        userId: localStorage.getItem("userId"),
        no_of_tickets: seats,
        totalPrize: event.price * seats,
        booking_status: ""
      };

      console.log("booking", booking);

      const response = await axios.post('http://localhost:3001/api/users/booking', booking);
      console.log("response", response.data.data);

      navigate(`/payment/${response.data.data._id}`);
    } catch (error) {
      console.error('Error creating booking:', error);
    }

    onClose();
  };

  return (
    <div className="popup-overlay">
      <div className="popup-box">
        <h2>Book Tickets for {event.title}</h2>
        <div className="popup-content">
          <label htmlFor="seats">Number of Seats:</label>
          <input
            type="number"
            id="seats"
            value={seats}
            min={1}
            onChange={(e) => setSeats(Number(e.target.value))}
          />
          <p>Total Price for {seats} seats: ${event.price * seats}</p>
        </div>
        <div className="popup-actions">
          <button onClick={handleBooking}>Confirm Booking</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default BookEventPopup;

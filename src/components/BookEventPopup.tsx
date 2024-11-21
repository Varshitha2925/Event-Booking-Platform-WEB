import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './BookEventPopup.css';

interface BookEventPopupProps {
  event: { _id: string; title: string };
  onClose: () => void;
}

const BookEventPopup: React.FC<BookEventPopupProps> = ({ event, onClose }) => {
  const [seats, setSeats] = useState(1);

  const navigate = useNavigate();

  const handleBooking = () => {

    // Navigate to the payment page
    navigate('/payment');
    // Close the popup
    onClose();
  };

  // const handleBooking = () => {
  //   alert(`Booked ${seats} seat(s) for ${event.title}`);
  //   onClose();
  // };

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

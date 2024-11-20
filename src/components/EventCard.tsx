import React, { useState } from "react";
import BookEventPopup from "./BookEventPopup";
import './styles.css';

interface EventCardProps {
  event: {
    _id: string;
    title: string;
    image: string;
    seatsAvailable: number;
    ticketPrice: number;
    type: string;
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="event-card">
      <img src={event.image} alt={event.title} />
      <h3>{event.title}</h3>
      <p>Seats Left: {event.seatsAvailable === Infinity ? "Unlimited" : event.seatsAvailable}</p>
      <p>Price: {event.ticketPrice > 0 ? `$${event.ticketPrice}` : "Free"}</p>
      <button onClick={() => setShowPopup(true)}>Book Now</button>
      {showPopup && <BookEventPopup event={event} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default EventCard;

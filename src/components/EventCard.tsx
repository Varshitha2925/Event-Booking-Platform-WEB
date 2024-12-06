import React, { useState } from "react";
import BookEventPopup from "./BookEventPopup";
import './styles.css';

interface EventCardProps {
  event: {
  id:string,
  organizerId: any,
  title: string,
  location: string,
  capacity: number,
  startdate: string,
  enddate:string,
  duration: number, // in hours
  type: string,
  price: number,
  ticketSold: number
  };
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="event-card">
      {/* <img src={event.image} alt={event.title} /> */}
      <h3>{event.title}</h3>
      <p>Seats Left: {event.capacity - event.ticketSold}</p>
      <p>Price: {event.price > 0 ? `$${event.price}` : "Free"}</p>
      <p>StartDate: {event.startdate}</p>
      <p>EndDate: {event.enddate}</p>
      <button onClick={() => setShowPopup(true)}>Book Now</button>
      {showPopup && <BookEventPopup event={event} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default EventCard;

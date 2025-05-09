import moment from "moment";
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
  startTime:string,
  endTime: string,
  duration: number, // in hours
  type: string,
  price: number,
  ticketSold: number,
  register: string,
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
      <p>StartDate: {moment(event.startdate).format("MM/DD/YYYY")}</p>
      <p>EndDate:  {moment(event.enddate).format("MM/DD/YYYY")}</p>
      <p>Time: {event.startTime} - {event.endTime}</p>
      <p>Duration: {event.duration}</p>
      {event.register !== 'yes' && (
  <button onClick={() => setShowPopup(true)}>Book Now</button>
)}

      {showPopup && <BookEventPopup event={event} onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default EventCard;

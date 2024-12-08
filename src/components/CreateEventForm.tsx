import moment from "moment";
import React, { useEffect, useState } from 'react';
import './CreateEventForm.css';
// interface Event {
//   id: string;
//   title: string;
//   location: string;
//   date: string;
//   capacity: number;
//   ticketsSold: number;
//   eventType: string;
// }
 interface Event {
  id:string,
  organizerId: any,
  title: string,
  location: string,
  capacity: number,
  startdate: string,
  enddate: string,
  startTime: string,
  endTime:string,
  duration: number, // in hours
  type: string,
  price: number,
  ticketSold: number
}

interface CreateEventPopupProps {
  onClose: () => void;
  onCreate: (event: Event) => void;
  eventToEdit?: Event | null;
}

const CreateEventPopup: React.FC<CreateEventPopupProps> = ({
  onClose,
  onCreate,
  eventToEdit,
}) => {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [startdate, setDate] = useState('');
  const [enddate, setenddate] = useState('');
  const [capacity, setCapacity] = useState(0);
  const [type, setEventType] = useState('Paid');
  const [startTime, setstartTime] = useState('');
  const [endTime, setendTime] = useState('');
  const [price, setPrice] = useState(0);
  const [duration, setduration] = useState(0);
  useEffect(() => {

    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setLocation(eventToEdit.location);
      setDate(moment(eventToEdit.startdate).format("YYYY-MM-DD"));
      setenddate(moment(eventToEdit.enddate).format("YYYY-MM-DD"))
      setduration(eventToEdit.duration);
      setCapacity(eventToEdit.capacity);
      setEventType(eventToEdit.type);
      setPrice(eventToEdit.price);
    }
  }, [eventToEdit]);

  const handleSubmit = () => {
    const newEvent: Event = {
      id: eventToEdit ? eventToEdit.id : Math.random().toString(36).substr(2, 9),
      title,
      location,
      startdate,
      enddate,
      startTime,
      endTime,
      capacity,
      ticketSold: eventToEdit ? eventToEdit.ticketSold : 0,
      organizerId: '',
      duration,
      price,
      type,
    };
    console.log("date",newEvent.startdate)
    console.log("newEvent",newEvent)
    onCreate(newEvent);
  };

  return (
    <div className="create-event-popup">
      <div className="popup-content">
        <h2>{eventToEdit ? 'Edit Event' : 'Create Event'}</h2>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            value={startdate}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={enddate}
            onChange={(e) => setenddate(e.target.value)}
          />
        </label>
        <label>
          Start Time:
          <input
            type="text"
            value={startTime}
            onChange={(e) => setstartTime(e.target.value)}
          />
        </label>
        <label>
          End Time:
          <input
            type="text"
            value={endTime}
            onChange={(e) => setendTime(e.target.value)}
          />
        </label>
        <label>
          Duration(in hours):
          <input
            type="number"
            value={duration}
            onChange={(e) => setduration(Number(e.target.value))}
          />
        </label>
        <label>
          Price:
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>
        <label>
          Capacity:
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(Number(e.target.value))}
          />
        </label>
        <label>
          Event Type:
          <select
            value={type}
            onChange={(e) => setEventType(e.target.value)}
          >
            <option value="Paid">Paid</option>
            <option value="Free Limited">Free Limited</option>
            <option value="Free Unlimited">Free Unlimited</option>
          </select>
        </label>
        <div className="popup-buttons">
          <button onClick={handleSubmit}>{eventToEdit ? 'Edit' : 'Create'}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPopup;

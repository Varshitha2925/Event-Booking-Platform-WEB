import moment from "moment";
import React, { useEffect, useState } from "react";
import "./CreateEventForm.css";

interface Event {
  id: string;
  organizerId: any;
  title: string;
  location: string;
  capacity: number;
  startdate: string;
  enddate: string;
  startTime: string;
  endTime: string;
  duration: string;
  type: string;
  price: number;
  ticketSold: number;
  register: string;
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
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [startdate, setDate] = useState("");
  const [enddate, setenddate] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [type, setEventType] = useState("Paid");
  const [startTime, setstartTime] = useState("");
  const [endTime, setendTime] = useState("");
  const [price, setPrice] = useState(0);
  const [duration, setduration] = useState("");

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title);
      setLocation(eventToEdit.location);
      setDate(moment(eventToEdit.startdate).format("YYYY-MM-DD"));
      setenddate(moment(eventToEdit.enddate).format("YYYY-MM-DD"));
      setduration(eventToEdit.duration);
      setCapacity(eventToEdit.capacity);
      setstartTime(eventToEdit.startTime);
      setendTime(eventToEdit.endTime);
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
      organizerId: "",
      duration,
      price,
      type,
      register: "yes"
    };
    console.log("newEvent", newEvent);
    onCreate(newEvent);
  };

  const calculateDuration = (start: string, end: string) => {
    if (start && end) {
      const startDate = new Date(`1970-01-01T${start}:00`);
      const endDate = new Date(`1970-01-01T${end}:00`);

      const diff = (endDate.getTime() - startDate.getTime()) / 1000 / 60;
      if (diff >= 0) {
        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;
        setduration(`${hours} hour(s) and ${minutes} minute(s)`);
      } else {
        setduration("End time must be after start time");
      }
    } else {
      setduration("");
    }
  };

  const handleStartTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setstartTime(value);
    calculateDuration(value, endTime);
  };

  const handleEndTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setendTime(value);
    calculateDuration(startTime, value);
  };

  return (
    <div className="create-event-popup">
      <div className="popup-content">
        <h2>{eventToEdit ? "Edit Event" : "Create Event"}</h2>

        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>

        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>

        <label>
          Start Date:
          <input type="date" value={startdate} onChange={(e) => setDate(e.target.value)} />
        </label>

        <label>
          End Date:
          <input type="date" value={enddate} onChange={(e) => setenddate(e.target.value)} />
        </label>

        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input type="time" id="startTime" value={startTime} onChange={handleStartTimeChange} required />
        </div>

        <div>
          <label htmlFor="endTime">End Time:</label>
          <input type="time" id="endTime" value={endTime} onChange={handleEndTimeChange} required />
        </div>

        <div>
          <label>Duration:</label>
          <p>{duration || "Duration will be calculated automatically"}</p>
        </div>

        <label>
          Capacity:
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <label>
              <input
                type="radio"
                checked={type === "Free Limited" || type === "Paid"}
                onChange={() => setEventType("Free Limited")}
              />
              Limited
            </label>
            {(type === "Free Limited" || type === "Paid") && (
              <input
                type="number"
                placeholder="Enter number of seats"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
              />
            )}
            <label>
              <input
                type="radio"
                checked={type === "Free Unlimited"}
                onChange={() => {
                  setEventType("Free Unlimited");
                  setCapacity(0);
                }}
              />
              Unlimited
            </label>
          </div>
        </label>

        <label>
          Tickets:
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <label>
              <input
                type="radio"
                checked={type === "Paid"}
                onChange={() => setEventType("Paid")}
              />
              Yes
            </label>
            {type === "Paid" && (
              <input
                type="number"
                placeholder="Enter ticket price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            )}
            <label>
              <input
                type="radio"
                checked={type !== "Paid"}
                onChange={() => {
                  setEventType("Free Unlimited");
                  setPrice(0);
                }}
              />
              No
            </label>
          </div>
        </label>

        <label>
          Register:
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <label>
              <input type="radio" name="register" value="yes" defaultChecked /> Yes
            </label>
            <label>
              <input type="radio" name="register" value="no" /> No
            </label>
          </div>
        </label>

        <div className="popup-buttons">
          <button onClick={handleSubmit}>{eventToEdit ? "Edit" : "Create"}</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventPopup;

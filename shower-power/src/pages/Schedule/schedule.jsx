import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import axios from "axios";

const SchedulingComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [scheduledEvent, setScheduledEvent] = useState(null);
  const [schedules, setSchedules] = useState([]); 
  const [selectedScheduleId, setSelectedScheduleId] = useState(null); 

  useEffect(() => {
  
    axios.get("/schedules")
      .then(response => {
        setSchedules(response.data); 
      })
      .catch(error => {
        console.error("Error fetching schedules:", error);
      });
  }, []);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const scheduleEvent = () => {
    if (selectedDate && selectedTime && selectedScheduleId) {
      const scheduledDateTime = new Date(selectedDate);
      scheduledDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes());

      
      axios.post("/appointments", {
        schedule_id: selectedScheduleId, 
        attendee_name: "John Doe", 
        attendee_email: "john.doe@example.com", 
        appointment_time: scheduledDateTime, 
      })
      .then(response => {
        setScheduledEvent(scheduledDateTime);
        console.log(response.data); 
      })
      .catch(error => {
        console.error("There was an error scheduling the event!", error);
      });
    } else {
      console.error("Please select a date, time, and schedule.");
    }
  };

  return (
    <div className="scheduling-component">
      <h3>Schedule an Event</h3>

      {/* Dropdown for selecting schedule */}
      <div>
        <label>Select Schedule:</label>
        <select onChange={(e) => setSelectedScheduleId(e.target.value)}>
          <option value="">Select a schedule</option>
          {schedules.map(schedule => (
            <option key={schedule.id} value={schedule.id}>
              {schedule.title} ({format(new Date(schedule.start_time), "MMMM d, yyyy h:mm aa")})
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Select Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM d, yyyy"
          placeholderText="Click to select a date"
        />
      </div>

      <div>
        <label>Select Time:</label>
        <DatePicker
          selected={selectedTime}
          onChange={handleTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
          placeholderText="Click to select a time"
        />
      </div>

      <button onClick={scheduleEvent}>Schedule</button>

      {scheduledEvent && (
        <div className="scheduled-event">
          <h4>Scheduled Event:</h4>
          <p>{format(scheduledEvent, "MMMM d, yyyy h:mm aa")}</p>
        </div>
      )}
    </div>
  );
};

export default SchedulingComponent;


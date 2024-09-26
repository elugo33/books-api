import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const SchedulingComponent = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [scheduledEvent, setScheduledEvent] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const scheduleEvent = () => {
    if (selectedDate && selectedTime) {
      const scheduledDateTime = new Date(selectedDate);
      scheduledDateTime.setHours(selectedTime.getHours(), selectedTime.getMinutes());

      setScheduledEvent(scheduledDateTime);
    }
  };

  return (
    <div className="scheduling-component">
      <h3>Schedule an Event</h3>
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

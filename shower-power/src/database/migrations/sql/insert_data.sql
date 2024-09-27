CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE schedules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  title VARCHAR(255),
  description TEXT,
  start_time DATETIME,
  end_time DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  schedule_id INT,
  attendee_name VARCHAR(100),
  attendee_email VARCHAR(100),
  appointment_time DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (schedule_id) REFERENCES schedules(id) ON DELETE CASCADE
);

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  // Check if user already exists
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (result.length > 0) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword],
      (err, result) => {
        if (err) throw err;
        res.status(201).json({ message: "User registered" });
      }
    );
  });
});

// User login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Find user in the database
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (result.length === 0) {
      return res.status(400).json({ error: "User not found" });
    }

    const user = result[0];

    // Compare password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  });
});
// Create a new schedule
app.post("/schedules", authenticateToken, (req, res) => {
  const { title, description, start_time, end_time } = req.body;
  const userId = req.user.id;

  db.query(
    "INSERT INTO schedules (user_id, title, description, start_time, end_time) VALUES (?, ?, ?, ?, ?)",
    [userId, title, description, start_time, end_time],
    (err, result) => {
      if (err) throw err;
      res.status(201).json({ message: "Schedule created" });
    }
  );
});

app.get("/schedules", authenticateToken, (req, res) => {
  const userId = req.user.id;

  db.query("SELECT * FROM schedules WHERE user_id = ?", [userId], (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.put("/schedules/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { title, description, start_time, end_time } = req.body;
  const userId = req.user.id;

  db.query(
    "UPDATE schedules SET title = ?, description = ?, start_time = ?, end_time = ? WHERE id = ? AND user_id = ?",
    [title, description, start_time, end_time, id, userId],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Schedule updated" });
    }
  );
});


app.delete("/schedules/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  db.query("DELETE FROM schedules WHERE id = ? AND user_id = ?", [id, userId], (err, result) => {
    if (err) throw err;
    res.json({ message: "Schedule deleted" });
  });
});
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import axios from "axios";  // Add axios for API requests

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

      // Send the event to the backend
      axios.post("/appointments", {
        schedule_id: 1,  // Dummy schedule ID
        attendee_name: "John Doe",  // Dummy attendee name
        attendee_email: "john.doe@example.com",  // Dummy email
        appointment_time: scheduledDateTime,  // Send the scheduled time
      })
      .then(response => {
        setScheduledEvent(scheduledDateTime);
        console.log(response.data);  // Handle success
      })
      .catch(error => {
        console.error("There was an error scheduling the event!", error);
      });
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

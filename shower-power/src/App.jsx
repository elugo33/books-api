import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login.jsx'; 
import Schedule from './pages/Schedule/schedule.jsx'; 

function App() {
  return (
    <Router>
      <div className="App">
        <div className="blur" style={{ top: '-18%', right: '0' }}></div>
        <div className="blur" style={{ top: '36%', left: '-8rem' }}></div>

        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='Schedule' element={<Schedule />} />
        </Routes>

        <footer> 
          <p><b>Created by-Eli Ugolino © Copyright-2024</b></p>
        </footer>  
      </div> 
    </Router>
  );
}

export default App;



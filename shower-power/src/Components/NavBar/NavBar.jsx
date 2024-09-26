import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css';
import Logo from '../../img/logo.png'; 

const NavBar = () => {
  return (
    <nav>
      <img className="logoImg" src={Logo} alt="Shower Power logo" />
      <div>
        <ul>
        
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
         
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;


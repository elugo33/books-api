import React, { useState } from "react";
import "./Login.css";
import Logo from '../../img/logo.png'; // Ensure the path is correct

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmpass: "",
  });

  const [confirmPass, setConfirmPass] = useState(true);

  // Use handleChange for input fields
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp && data.password !== data.confirmpass) {
      setConfirmPass(false);
    } else {
      // Handle form submission logic here
      console.log("Form data submitted:", data);
      resetForm(); // Call resetForm after submission
    }
  };

  // Reset form
  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: "",
      lastname: "",
      email: "",
      username: "",
      password: "",
      confirmpass: "",
    });
  };

  return (
    <div className="Login">
      <div className="a-left">
        <img src={Logo} alt="ShowerPower Logo" />
        <div className="Webname">
          <h1>Shower Power</h1>
        </div>
      </div>

      <div className="a-right">
        <form className="infoForm loginForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Sign up" : "Log In"}</h3>
          <div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={handleChange} // Ensure handleChange is used
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange} // Ensure handleChange is used
              required
            />
          </div>
          {isSignUp && (
            <>
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={data.password}
                  onChange={handleChange} // Ensure handleChange is used
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  name="confirmpass"
                  placeholder="Confirm Password"
                  value={data.confirmpass}
                  onChange={handleChange} // Ensure handleChange is used
                  required
                />
                {!confirmPass && <span>Passwords do not match!</span>}
              </div>
            </>
          )}
          <button type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>
          <button type="button" onClick={() => {
            setIsSignUp(!isSignUp);
            resetForm(); // Reset form when toggling
          }}>
            {isSignUp ? "Already have an account? Log In" : "Don't have an account? Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;


import React, { useState } from "react";
import "./Login.css";
import Logo from '../../img/Ignite ShowerPower logo.pdf';

//import { useDispatch, useSelector } from "react-redux";//import hook

const Login = () => {
  //useState hooks-allows to add state to a functional component
  const [isSignUp, setIsSignUp] = useState(false) //IsSign up false we are rendering our login page
  //const dispatch = useDispatch();//instance of a hook

  const [data, setData]=useState({
        firstname: "",
        lastname: "",
        location: "",
        email: "",
        username: "",
        password: "",
        confirmpass: "",
  });

  const [confirmPass, setConfirmPass] = useState(true);

// handle Change in input
const handleChange = (e) => {
  setData({ ...data, [e.target.name]: e.target.value });//use single function for all our inputs
};

// Form Submission
const handleSubmit = (e) => {
  e.preventDefault();
  if (isSignUp) 
  {
    if(data.password !== data.confirmpass) //Intract with the actions of React Redux 
    {
      setConfirmPass(false)
    }
  }
};

const resetForm = () => {
  setConfirmPass(true);
  setData({
        firstname: "",
        lastname: "",
        hobbies: "",
        email: "",
        username: "",
        password: "",
        confirmpass: "",
});
};

  return (
    <div className="Login">
{/* Left side with the logo and Navbar*/}
      <div className="a-left">
        <img src={Logo} alt="HobbyHUB custom logo shout out Ari!" />
        <div className="Webname">
          <h1>Hobby Hub</h1>
        </div>
      </div>
{/* Right side */}
      <div className="a-right">
      <form className="infoForm loginForm" onSubmit={handleSubmit}>
      <h3>{isSignUp ? "Sign up" : "Log In"}</h3>
        
          {isSignUp && (
          <div>
            <input
            type="text"
            placeholder="First Name"
            className="infoInput"
            name="firstname"
            onChange={handleChange}
            value={data.firstname}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="infoInput"
            name="lastname"
            onChange={handleChange}
            value={data.lastname}
          />
          </div>
          )}
          {isSignUp && (
          <div>
            <input
            type="text"
            className="infoInput"
            name="hobbies"
            placeholder="Hobbies"
            onChange={handleChange}
            value={data.hobbies}
          />
          </div>
          )}
          {isSignUp && (
          <div>
          <input
            type="text"
            className="infoInput"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={data.email}
          />
        </div>
        )}
          
          <div>
            <input
            type="text"
            className="infoInput"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={data.username}
          />
        </div>
        <div>
          <input
            type="password"
            className="infoInput"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={data.password}
          />
          {isSignUp && (
         <input
            type="password"
            className="infoInput"
            name="confirmpass"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={data.confirmpass}
          />
          )}
          </div>
        <span 
        style={{display:confirmPass? "none": "block", 
        color: 'red',
        fontSize: '12px', 
        alignSelf: "flex-end" ,
         marginRight: "5px", display: confirmPass ? "none" : "block",
        }}
      >
          * Confirm Password is not same
          </span>
        <div>
            <span
             style={{fontSize: "12px", cursor:"pointer", color:"orange",textDecoration:"underline"}} 
            onClick= {() => {setIsSignUp((prev) => !prev); resetForm()}}>
              {isSignUp?
                 "Already have an account. Login!":
                 "Don't have an account? Sign Up"}
            </span>
        </div>
        <button className="button infoButton" type="submit">
        {isSignUp ? "Sign Up": "Log In"}
        </button>
      </form>
    </div>
      {/* <LogIn/> */}
      {/* <SignUp/> */}
    </div>
  );
};
// function LogIn() {
//     return (
//       <div className="a-right">
//         <form className="infoForm loginForm">
//           <h3>Log In</h3>
  
//           <div>
//             <input
//               type="text"
//               placeholder="Username"
//               className="infoInput"
//               name="username"
//             />
//           </div>
  
//           <div>
//             <input
//               type="password"
//               className="infoInput"
//               placeholder="Password"
//               name="password"
//             />
//           </div>
//           <div>
//               <span style={{ fontSize: "12px" }}>
//                 Forgot password?
//               </span>
//           </div>
//           <div>
//               <span style={{ fontSize: "14px" }}>
//                 Don't have an account Sign up
//               </span>
              
//             <button className="button infoButton">Login</button>
            
//           </div>
//         </form>
//       </div>
//     );
//   }
// function SignUp() {
//   return (
    
//   );
// }

export default Login;
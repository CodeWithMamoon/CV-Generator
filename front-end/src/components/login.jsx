import React, { useState } from "react";
import "../style/login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login({ setloginUser }) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle login
  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", user);
      setErrorMessage("");
      setloginUser(res.data.user)
      navigate("/")// Clear error if login is successful
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message); // Set error message from backend
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <button type="submit" onClick={login}>Login</button>
        <p>Or</p>
        <button type="submit" onClick={() => navigate("/register")}>Register</button>
      </div>
    </div>
  );
}

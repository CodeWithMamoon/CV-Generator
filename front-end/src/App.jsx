import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import Login from "./components/login";
import Register from "./components/register";
import './index.css';
export default function App() {
  const [user, setloginUser] = useState(null); 

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={user && user._id ? <Home setloginUser={setloginUser} /> : <Login setloginUser={setloginUser} />} 
        />
        <Route path="/login" element={<Login setloginUser={setloginUser} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

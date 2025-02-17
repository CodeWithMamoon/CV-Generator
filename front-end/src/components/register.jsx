import React, { useState } from "react";
import "../style/register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Register() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    const{name,value}=e.target
    console.log(name,value)
    setuser({
      ...user,
      [name]:value
    })
  
  };
   const navigate = useNavigate(); 
  const [user,setuser]=useState({
    name:"",
    email:"",
    password:"",
    reEnterPassword:""
  })

  const register=()=>{
    const {name,email,password,reEnterPassword}=user
    if(name&& email&& password &&(password===reEnterPassword)){
      axios.post("http://localhost:5000/register",user)
      .then(res=>alert(res.data.message))
    }else{
      alert("invalid")
    }
  }

  return (
    <div className="register-container">
       <div  className="register-form">
       <h2>Register</h2>
       {console.log(user)}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={user.name}
          onChange={handleRegister}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleRegister}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleRegister}
          required
        />
            <input
          type="password"
          name="reEnterPassword"
          placeholder="Re-Enter Password"
          value={user.reEnterPassword}
          onChange={handleRegister}
          required
        />
        <button type="submit" onClick={register}>Register</button>
        <p>Or</p>
        <button type="submit" onClick={()=> navigate("/login")}>Login</button>
       </div>
       
    </div>
  );
}

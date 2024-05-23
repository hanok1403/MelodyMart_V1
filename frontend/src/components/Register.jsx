import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/login.css";
import InputV from './InputV';
const Register = () => {
  const navigate = useNavigate();
  const handleSubmit=(event)=>{
    event.preventDefault();
    //handle registrations process here
    navigate('/customer');
  }
  return (
    <div className="login-wrapper">
    <div className="login-container">
    <form action="post" onSubmit={handleSubmit} className="login-form">
      <div className="input-container">
      <InputV value={"Enter your name"} />
      <InputV value={"Email"}/>
      <InputV value={"password"}/>
      <button type="submit">Register</button>
      </div>
      </form>
      </div>
      </div>
  )
}

export default Register;

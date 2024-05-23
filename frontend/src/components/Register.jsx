import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputV from './InputV';
const Register = () => {
  const navigate = useNavigate();
  const handleSubmit=(event)=>{
    event.preventDefault();
    //handle registrations process here
    navigate('/login');
  }
  return (
    <form action="post" onSubmit={handleSubmit}>
      <InputV value={"Enter your name"} />
      <InputV value={"Email"}/>
      <InputV value={"password"}/>
      <button type="submit">Register</button>
      </form>
  )
}

export default Register;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/login.css";
import InputV from './InputV';
const Login = (props) => {
const [userType,setUserType]=useState('');

  useEffect(() => {
    if (props.type) {
      setUserType(props.type);
    }
  }, [props.userType]);

  console.log(userType);
  const navigate = useNavigate();

  const handleClick=(event)=>{
    event.preventDefault();
    //handle login authentication here
    if(userType==='admin')
    navigate("/admin-dashboard");
    else if(userType==='customer')
    navigate("/");
  }

  return (
    <div className="login-wrapper">
    <div className="login-container">
      <form action="post" onSubmit={handleClick} className="login-form">
        <div className="input-container">
      <InputV type="text" name="email" id="email" value={"Enter your email"}/>
      <InputV type="password" name="password" id="password" value={"Enter your password"}/>
      <button  type="submit">Login</button>
        </div>
      </form>
      </div>
    </div>
  )
}
export default Login;

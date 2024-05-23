import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div>
      <form action="post" onSubmit={handleClick}>
      <InputV type="text" name="email" id="email" value={"Enter your email"}/>
      <InputV type="password" name="password" id="password" value={"Enter your password"}/>
      <button  type="submit">Login</button>
      </form>
    </div>
  )
}
export default Login;

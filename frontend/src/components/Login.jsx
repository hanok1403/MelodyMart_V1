import React from 'react';
import { useNavigate } from 'react-router-dom';
import InputV from './InputV';
const Login = () => {
  const navigate = useNavigate();
  const handleClick=(event)=>{
    event.preventDefault();
    //handle login authentication here
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

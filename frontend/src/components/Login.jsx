import React from 'react';
import { Link } from 'react-router-dom'; 
import "../styles/login.css";
import InputV from './InputV';

const Login = (props) => {
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1>Login</h1>
        <form action="post" className="login-form">
          <div className="input-container">
            <InputV type="text" name="email" id="email" value={"Enter your email"}/>
            <InputV type="password" name="password" id="password" value={"Enter your password"}/>
            <button type="submit" className="login-button">Login</button>
          </div>
        </form>
        
        <div className="signup-link">
          <p>Don't have an account?</p> <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login;

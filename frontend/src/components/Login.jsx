import React, { useEffect } from 'react';
import InputV from './InputV';
const Login = () => {
  
  return (
    <div>
      <form action="post">
      <InputV type="text" name="email" id="email" value={"Enter your email"}/>
      <InputV type="password" name="password" id="password" value={"Enter your password"}/>
      <button type="submit">Login</button>
      </form>
    </div>
  )
}
export default Login;

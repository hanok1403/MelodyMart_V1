import React from 'react';
import InputV from './InputV';
const Login = () => {
  return (
    <div>
      <form action="post">
      <InputV value={"Email"}/>
      <InputV value={"password"}/>
      <button type="submit">Login</button>
      </form>
    </div>
  )
}
export default Login;

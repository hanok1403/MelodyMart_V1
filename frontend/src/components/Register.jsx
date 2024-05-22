import React from 'react';
import InputV from './InputV';
const Register = () => {
  return (
    <form action="post">
      <InputV value={"Enter your name"} />
      <InputV value={"Email"}/>
      <InputV value={"password"}/>
      <button type="submit">Register</button>
      </form>
  )
}

export default Register;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../styles/Login.css";
import InputV from './InputV';

const Register = () => {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    //handle registrations process here
    navigate('/login');
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <InputV ph={"Enter your Name"} />
                </div>
                <div className="form-group">
                  <InputV ph={"Enter your Email"} />
                </div>
                <div className="form-group">
                  <InputV ph={"Enter Password"} />
                </div>
                <div className="form-group">
                  <InputV ph={"Confirm Password"} />
                </div>
                <div className="form-group">
                  <InputV ph={"Mobile Number"} />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-block">Register</button>
                </div>
              </form>
              <div className="text-center">
                <p>Already a user? <Link to="/login">Login</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;

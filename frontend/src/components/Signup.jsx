import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/signup.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5001/signup', {
        email,
        password,
        username,
        mobileNumber,
      });
      if(response.data.userExists){
        alert('User already exists!!! Navigating to login...');
      }
      else{
        alert('Signup Successful');
        console.log(response.data);
      }
      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data.message); // Display the error message from the server
        // navigate('/login');
      } else {
        alert('Signup Failed'); // Generic error message if server response does not indicate user exists
      }
      console.log('Error signing up:', err);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="row w-100">
        <div className="col-md-6 offset-md-3">
          <div className="card signup-card">
            <div className="card-body">
              <h2 className="text-center mb-4">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group" id="username">
                  <label>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mt-3" id="email">
                  <label>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mt-3" id="password">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group mt-3" id="mobile">
                  <label>Mobile</label>
                  <input
                    type="text"
                    className="form-control"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-50 mt-4 mx-auto d-block">Sign Up</button>
              </form>
              <div className="w-100 text-center mt-3 d-flex justify-content-center align-items-center">
                <span>Already a user? </span>
                <button className="btn btn-link" onClick={() => navigate('/login')}>Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

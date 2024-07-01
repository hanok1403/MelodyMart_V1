import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import '../styles/signup.css';

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Username</label>
              <input
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Mobile</label>
              <input
                type="text"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full mt-4">Sign Up</button>
          </form>
          <div className="text-center mt-4">
            <span>Already a user?</span>
            <button className="text-blue-500 underline ml-2" onClick={() => navigate('/login')}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

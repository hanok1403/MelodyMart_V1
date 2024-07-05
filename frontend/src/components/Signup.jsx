import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faMobileAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!/^[a-zA-Z][a-zA-Z0-9]{3,}$/.test(username)) {
      setError('Username must start with a letter and be at least 4 characters long (letters and numbers only)');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password)) {
      setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      setError('Mobile number must be exactly 10 digits');
      return;
    }

    // If all validations pass, reset the error and make the API request
    setError('');
    
    try {
      const response = await axios.post('http://localhost:5001/signup', {
        email,
        password,
        username,
        mobileNumber,
      });
      
      if (response.data.userExists) {
        alert('User already exists!!! Navigating to login...');
      } else {
        alert('Signup Successful');
        // console.log(response.data);
      }

      navigate('/login');
    } catch (err) {
      if (err.response && err.response.data) {
        alert(err.response.data.message); // Display the error message from the server
      } else {
        alert('Signup Failed'); // Generic error message if server response does not indicate user exists
      }
      // console.log('Error signing up:', err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-300 via-cyan-250 to-green-300">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          {error && <div className="text-red-500 text-center mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 flex items-center">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Username
              </label>
              <input
                type="text"
                className="mt-1 p-2 pl-10 border border-gray-300 rounded w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 flex items-center">
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Email
              </label>
              <input
                type="email"
                className="mt-1 p-2 pl-10 border border-gray-300 rounded w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 flex items-center">
                <FontAwesomeIcon icon={faLock} className="mr-2" />
                Password
              </label>
              <input
                type="password"
                className="mt-1 p-2 pl-10 border border-gray-300 rounded w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 flex items-center">
                <FontAwesomeIcon icon={faLock} className="mr-2" />
                Confirm Password
              </label>
              <input
                type="password"
                className="mt-1 p-2 pl-10 border border-gray-300 rounded w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 flex items-center">
                <FontAwesomeIcon icon={faMobileAlt} className="mr-2" />
                Mobile
              </label>
              <input
                type="text"
                className="mt-1 p-2 pl-10 border border-gray-300 rounded w-full"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full mt-4 flex items-center justify-center">
              <span>Sign Up</span>
              <FontAwesomeIcon icon={faUserPlus} className="ml-2" />
            </button>
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

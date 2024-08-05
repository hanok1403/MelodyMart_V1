import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faMobileAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  // const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    // Client-side validation
    if (!/^[a-zA-Z][a-zA-Z0-9]{3,}$/.test(username)) {
      // setError('Username must start with a letter and be at least 4 characters long (letters and numbers only)');
      toast.error('Username must start with a letter and be at least 4 characters long (letters and numbers only)');
      return;
    }
  
    if (!emailRegex.test(email)) {
      // setError('Please enter a valid email address');
      toast.error('Please enter a valid email address');
      return;
    }
  
    if (password !== confirmPassword) {
      // setError('Passwords do not match');
      toast.error('Passwords do not match');
      return;
    }
  
    if (password.length < 8) {
      // setError('Password must be at least 8 characters long');
      toast.error('Password must be at least 8 characters long');
      return;
    }
  
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password)) {
      // setError('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      toast.error('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');
      return;
    }
  
    if (!/^\d{10}$/.test(mobileNumber)) {
      // setError('Mobile number must be exactly 10 digits');
      toast.error('Mobile number must be exactly 10 digits');
      return;
    }
  
    
    try {
      const response = await axios.post('/api/signup', {
        email,
        password,
        username,
        mobileNumber,
      });
      
      if (response.data.userExists) {
        toast.info('User already exists!!! Navigating to login...');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        toast.success('Signup Successful!!! Navigating to login...');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Signup Failed');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-300 to-orange-300">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        limit={3}
      />
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg p-8 mt-3">
          <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
          {/* {error && <div className="text-red-500 text-center mb-4">{error}</div>} */}
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
import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const resetToken = queryParams.get('token');
  const email = queryParams.get('email');

  const passwordRequirements = {
    minLength: 8,
    hasUpperCase: /[A-Z]/,
    hasLowerCase: /[a-z]/,
    hasNumber: /[0-9]/,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
  };

  const handlePasswordResetSuccess = () => {
    toast.success("Password reset successfully");
    setNewPassword('');
    setConfirmPassword('');
    
    setTimeout(() => {
        navigate('/login');
    }, 3000);  
};

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword === confirmPassword) {
      if (!validatePassword(newPassword)) {
        toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
        return;
      }
      //console.log(newPassword, resetToken, email);
      try {
        await axios.post(`/api/reset-password`, {
          password: newPassword,
          resetToken: resetToken, 
          email: email
        });
        handlePasswordResetSuccess();
        
      } catch (error) {
        const errorMessage = error.response?.data?.message || 
                               "An error occurred. Please try again later.";
        toast.error(errorMessage);
      }
    } else {
      toast.error("Passwords do not match");
    }
  };

  const toggleVisibility = (setter) => {
    setter((prevState) => !prevState);
  };

  const validatePassword = (password) => {
    return (
      password.length >= passwordRequirements.minLength &&
      passwordRequirements.hasUpperCase.test(password) &&
      passwordRequirements.hasLowerCase.test(password) &&
      passwordRequirements.hasNumber.test(password) &&
      passwordRequirements.hasSpecialChar.test(password)
    );
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-gradient-to-r from-blue-300 via-pink-250 to-orange-200">
      <ToastContainer 
            position="top-center"
            autoClose={3000}
            closeOnClick
            pauseOnHover
            limit={3}
            style={{ width: '400px' }} 
        />
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-6 text-center">Reset Password</h1>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="block mb-2">New Password</label>
            <div className="relative">
              <input
                type={newPasswordVisible ? 'text' : 'password'}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button type="button" onClick={() => toggleVisibility(setNewPasswordVisible)} className="absolute right-2 top-2">
                <FontAwesomeIcon icon={newPasswordVisible ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Confirm New Password</label>
            <div className="relative">
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <button type="button" onClick={() => toggleVisibility(setConfirmPasswordVisible)} className="absolute right-2 top-2">
                <FontAwesomeIcon icon={confirmPasswordVisible ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;

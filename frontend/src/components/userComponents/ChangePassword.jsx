import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const passwordRequirements = {
    minLength: 8,
    hasUpperCase: /[A-Z]/,
    hasLowerCase: /[a-z]/,
    hasNumber: /[0-9]/,
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    try {
      const data = JSON.parse(localStorage.getItem('user'));
      const userId = data.user.id;

      // Assuming the backend endpoint exists to validate the current password
      const response = await axios.get(`/api/users/${userId}`);
      const user = response.data;

      if (user.password === currentPassword) {
        if (newPassword === currentPassword) {
          toast.error("New Password can't be the same as Current Password");
          return;
        }
        if (newPassword === confirmPassword) {
          if (!validatePassword(newPassword)) {
            toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
          }

          await axios.put(`/api/users/${userId}`, {
            password: newPassword
          });
          toast.success("Password Changed Successfully");
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setError('');
        } else {
          toast.error("Passwords do not match");
        }
      } else {
        toast.error("Current Password is incorrect");
      }
    } catch (error) {
      toast.error("Error updating password. Please try again later.");
      console.error("Error:", error);
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
      />
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-semibold mb-6 text-center">Change Password</h1>
        <form onSubmit={handleChangePassword}>
          <div className="mb-4">
            <label className="block mb-2">Current Password</label>
            <div className="relative">
              <input
                type={currentPasswordVisible ? 'text' : 'password'}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              <button type="button" onClick={() => toggleVisibility(setCurrentPasswordVisible)} className="absolute right-2 top-2">
                <FontAwesomeIcon icon={currentPasswordVisible ? faEyeSlash : faEye} />
              </button>
            </div>
          </div>
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
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

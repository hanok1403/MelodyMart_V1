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
      const data = JSON.parse(localStorage.getItem('user'))
      const userId = data.user.id;
      const response = await axios.get(`/users/${userId}`);
      const user = response.data;

      if (user.password === currentPassword) {
        if(user.password === newPassword){
            toast.error("New Password can't be same as Current Password");
            // setError("New Password can't be same as Current Password");
            return;
        }
        if (newPassword === confirmPassword) {
          if (!validatePassword(newPassword)) {
            toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
            // setError("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
          }

          const response= await axios.put(`/api/users/${userId}`, {
            password: newPassword
          });
          console.log(response.data);
          toast.success("Password Changed Successfully");
          // alert("Password updated successfully");
          setCurrentPassword('');
          setNewPassword('');
          setConfirmPassword('');
          setError('');
        } else {
          toast.error("Passwords do not match");
          // setError("Passwords do not match");
        }
      } else {
        toast.error("Current Password is incorrect");
        // setError("Current password is incorrect");
      }
    } catch (error) {
      toast.error("Error updating password. Please try again later.");
      // setError("Error updating password. Please try again later.");
      console.error("Error:", error);
    }
  };

  const toggleVisibility = (setter) => {
    setter(prevState => !prevState);
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
        {/* {error && <p className="text-red-500 mb-4 text-center">{error}</p>} */}
        <form onSubmit={handleChangePassword}>
          <div className="mb-4 relative">
            <input
              type={currentPasswordVisible ? "text" : "password"}
              name="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter Current Password"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
            <FontAwesomeIcon
              icon={currentPasswordVisible ? faEyeSlash : faEye}
              onClick={() => toggleVisibility(setCurrentPasswordVisible)}
              className="absolute right-2 top-5 cursor-pointer"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={newPasswordVisible ? "text" : "password"}
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
            <FontAwesomeIcon
              icon={newPasswordVisible ? faEyeSlash : faEye}
              onClick={() => toggleVisibility(setNewPasswordVisible)}
              className="absolute right-2 top-5 cursor-pointer"
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="w-full p-2 border border-gray-300 rounded mt-2"
              required
            />
            <FontAwesomeIcon
              icon={confirmPasswordVisible ? faEyeSlash : faEye}
              onClick={() => toggleVisibility(setConfirmPasswordVisible)}
              className="absolute right-2 top-5 cursor-pointer"
            />
          </div>
          <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;

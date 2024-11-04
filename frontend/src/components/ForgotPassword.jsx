import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate= useNavigate();
    
    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5001/forgotPassword', { email });
            
            if (response.status === 200) {
                toast.success("A new password has been sent to your email. Please check your inbox.");
                setTimeout(() => navigate('/login'), 3000);
            }
        } catch (err) {
            if (err.response && err.response.status === 404) {
                toast.error("User not found. Please enter a registered email.");
            } else {
                toast.error("An error occurred while sending the reset password link. Please try again.");
            }
        }
    };

    return (
        <div className="flex justify-center items-center bg-gradient-to-br h-screen from-purple-300 to-orange-300">
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover
                limit={3}
            />
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-center text-2xl font-bold mb-6">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700">
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                            Email
                        </label>
                        <input
                            type="email"
                            className="mt-1 p-2 pl-10 border border-gray-300 rounded w-full"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <div className="flex justify-center">
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full mt-4">
                                Send Reset Link
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;

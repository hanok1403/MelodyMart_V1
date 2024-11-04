import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5001/api/forgotPassword', { 
                email: email.trim() 
            });
            
            toast.success(response.data.message);
            setTimeout(() => {
                setEmail('');
                navigate('/login');
            }, 3000);
            
        } catch (err) {
            const errorMessage = err.response?.data?.message || 
                               "An error occurred. Please try again later.";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
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
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-center text-2xl font-bold mb-6">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700 mb-2">
                            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                            Email
                        </label>
                        <input
                            type="email"
                            className="mt-1 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            placeholder="Enter your registered email"
                            required
                        />
                    </div>
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                            disabled={loading}
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
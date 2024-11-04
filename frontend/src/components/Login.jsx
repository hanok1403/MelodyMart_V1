import React, { useState } from 'react';
import { useAuth } from '../Router/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { loginAction } = useAuth();
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                toast.error('Login failed. Please check your credentials and try again.');
                return;
            }

            const data = await response.json();
            loginAction(data);
            localStorage.setItem('user', JSON.stringify(data));

            // alert("Login successful");
            toast.success("Login Successful!!!", {
                onClose: () => {
                    const user = JSON.parse(localStorage.getItem('user'));
                    if (user) {
                        if (user.user.role === 'user') {
                            navigate('/home');
                        } else if (user.user.role === 'admin') {
                            navigate('/admin/dashboard');
                        }
                    }
                }
            });
        } catch (err) {
            toast.error('Login failed. Please check your credentials and try again.');
            console.error(err);
        }
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    const handleForgotPassword = () => {
        navigate('/forgotPassword');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-300 to-orange-300">
            <ToastContainer
                position='top-center'
                autoClose={3000}
                closeOnClick
                newestOnTop
                pauseOnHover
                limit={3}
            />
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
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
                            value={credentials.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4 relative">
                        <label className="block text-gray-700">
                            <FontAwesomeIcon icon={faLock} className="mr-2" />
                            Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="mt-1 p-2 pl-10 border border-gray-300 rounded w-full"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />
                        <span className="absolute right-2 top-9 cursor-pointer" onClick={togglePasswordVisibility}>
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                        </span>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full mt-4">
                        Login
                    </button>
                </form>
                <div className=" mt-4">
                    <div className='flex justify-between'>
                        <button className="text-blue-500 underline text-left" onClick={handleForgotPassword}>
                            Forgot Password?
                        </button>
                        <button className="text-blue-500 underline text-right" onClick={handleSignupClick}>
                            New user? Sign up here
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

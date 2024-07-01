import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { useAuth } from '../Router/AuthProvider';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const { loginAction } = useAuth();
    const [error, setError] = useState(null);
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

        try {
            const response = await fetch('http://localhost:5001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log("while submitting" + data)
            loginAction(data); 
            localStorage.setItem('user', JSON.stringify(data)); 
            // navigate('/dashboard'); 
        } catch (err) {
            setError('Login failed. Please check your credentials and try again.');
            console.error(err);
        }
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    return (
        <div className="login-container container">
            <div className="card login-card">
                <div className="card-body">
                    <h2 className="text-center mb-4">Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group" id="email">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={credentials.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mt-3" id="password">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                value={credentials.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-4">
                            Login
                        </button>
                    </form>
                    <div className="w-100 text-center mt-3">
                        <p>Don't have an account?</p>
                        <button className="btn btn-link" onClick={handleSignupClick}>
                            Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Profile.css';
import { useAuth } from '../Router/AuthProvider';

const Profile = () => {
    const auth = useAuth();
    console.log(auth.user);
    const [user, setUser] = useState({
        username: auth.user.username,
        email: auth.user.email,
        mobile: auth.user.mobileNumber
        // password: auth.user. 
    });
    const [newUsername, setNewUsername] = useState(auth.user.username);
    const [newEmail, setNewEmail] = useState(auth.user.email);
    const [newMobile, setNewMobile] = useState(auth.user.mobileNumber);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    

    useEffect(() => {
        
        // axios.get('http://localhost:5000/e')
        //     .then(response => {
        //         setUser(response.data);
        //         setNewUsername(response.data.username);
        //         setNewEmail(response.data.email);
        //         setNewMobile(response.data.mobile);
        //     })
        //     .catch(error => {
        //         console.error('Error fetching user data', error);
        //     });
    }, []);

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
    };

    const handleMobileChange = (e) => {
        setNewMobile(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        const updatedUser = {
            username: newUsername,
            email: newEmail,
            mobile: newMobile,
            password: newPassword
        };

        axios.put('/api/user/profile', updatedUser)
            .then(response => {
                setMessage('Profile updated successfully');
                setUser(response.data);
            })
            .catch(error => {
                setMessage('Error updating profile');
                console.error('Error updating profile', error);
            });
    };

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={newUsername}
                        onChange={handleUsernameChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={newEmail}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                        type="text"
                        id="mobile"
                        value={newMobile}
                        onChange={handleMobileChange}
                        required
                    />
                </div>
                {/* <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input
                        type="password"
                        id="password"
                        value={newPassword}
                        onChange={handlePasswordChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                </div> */}
                <button type="submit">Update Profile</button>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default Profile;

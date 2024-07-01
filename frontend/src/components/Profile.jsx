// src/components/Profile.js
import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import '../styles/Profile.css';
import { useAuth } from '../Router/AuthProvider';

const Profile = () => {
    const auth = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [user, setUser] = useState({
        username: auth.user.username,
        email: auth.user.email,
        mobile: auth.user.mobileNumber
    });
    const [newUsername, setNewUsername] = useState(auth.user.username);
    const [newEmail, setNewEmail] = useState(auth.user.email);
    const [newMobile, setNewMobile] = useState(auth.user.mobileNumber);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch user data from backend
        // This useEffect is executed only once on component mount
        // You can uncomment this if you need to fetch user data from the server
        // fetchUserData();
    }, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        // Perform validation if needed

        // Update the user object
        setUser({
            username: newUsername,
            email: newEmail,
            mobile: newMobile
        });

        // Save changes to the server using axios or any other method
        
        // For demo purposes, we'll just show a message
        setMessage('Changes saved successfully.');

        // Disable editing mode
        setIsEditing(false);
    };

    const handleCancel = () => {
        // Reset input fields to their original values
        setNewUsername(user.username);
        setNewEmail(user.email);
        setNewMobile(user.mobile);

        // Disable editing mode
        setIsEditing(false);
    };

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setNewEmail(e.target.value);
    };

    const handleMobileChange = (e) => {
        setNewMobile(e.target.value);
    };

    return (
        <div className="profile-container">
            <h2>User Profile</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        value={newUsername}
                        onChange={handleUsernameChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={newEmail}
                        onChange={handleEmailChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                        type="text"
                        id="mobile"
                        value={newMobile}
                        onChange={handleMobileChange}
                        readOnly={!isEditing}
                    />
                </div>
                <div className="btn-group">
                    {!isEditing && (
                        <button type="button" onClick={handleEdit}>Edit</button>
                    )}
                    {isEditing && (
                        <React.Fragment>
                            <button type="button" onClick={handleSave}>Save</button>
                            <button type="button" onClick={handleCancel}>Cancel</button>
                        </React.Fragment>
                    )}
                </div>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default Profile;

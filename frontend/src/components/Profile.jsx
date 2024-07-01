import React, { useState, useEffect } from 'react';
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

    useEffect(() => {}, []);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setUser({
            username: newUsername,
            email: newEmail,
            mobile: newMobile
        });
        setMessage('Changes saved successfully.');
        setIsEditing(false);
    };

    const handleCancel = () => {
        setNewUsername(user.username);
        setNewEmail(user.email);
        setNewMobile(user.mobile);
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
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={newUsername}
                            onChange={handleUsernameChange}
                            readOnly={!isEditing}
                            className={`mt-1 p-2 border ${isEditing ? 'border-blue-500' : 'border-gray-300'} rounded w-full`}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={newEmail}
                            onChange={handleEmailChange}
                            readOnly={!isEditing}
                            className={`mt-1 p-2 border ${isEditing ? 'border-blue-500' : 'border-gray-300'} rounded w-full`}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="mobile" className="block text-gray-700">Mobile Number</label>
                        <input
                            type="text"
                            id="mobile"
                            value={newMobile}
                            onChange={handleMobileChange}
                            readOnly={!isEditing}
                            className={`mt-1 p-2 border ${isEditing ? 'border-blue-500' : 'border-gray-300'} rounded w-full`}
                        />
                    </div>
                    <div className="flex justify-between">
                        {!isEditing && (
                            <button
                                type="button"
                                onClick={handleEdit}
                                className="bg-blue-500 text-white py-2 px-4 rounded"
                            >
                                Edit
                            </button>
                        )}
                        {isEditing && (
                            <>
                                <button
                                    type="button"
                                    onClick={handleSave}
                                    className="bg-green-500 text-white py-2 px-4 rounded"
                                >
                                    Save
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="bg-red-500 text-white py-2 px-4 rounded"
                                >
                                    Cancel
                                </button>
                            </>
                        )}
                    </div>
                    {message && <p className="text-green-500 mt-4 text-center">{message}</p>}
                </form>
            </div>
        </div>
    );
};

export default Profile;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);

    const data = JSON.parse(localStorage.getItem('user'));
    const userId = data.user.id;

    const [user, setUser] = useState({
        username: '',
        email: '',
        mobile: ''
    });
    const [newUsername, setNewUsername] = useState('');
    const [newMobile, setNewMobile] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`/api/users/${userId}`);
                const userData = response.data;
                setUser({
                    username: userData.username,
                    email: userData.email,
                    mobile: userData.mobileNumber
                });
                setNewUsername(userData.username);
                setNewMobile(userData.mobileNumber);
            } catch (error) {
                console.error("Error fetching user data:", error);
                setMessage("Error fetching user data. Please try again later.");
            }
        };

        fetchUserData();
    }, [userId]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            if (!validateUsername(newUsername)) {
                setError('Username must have at least 4 characters, start with a letter, and only contain letters and numbers.');
                return;
            }
            if (!validateMobile(newMobile)) {
                setError('Mobile number must have exactly 10 digits.');
                return;
            }

            const response = await axios.put(`/users/update/${userId}`, {
                username: newUsername,
                mobileNumber: newMobile
            });

            console.log('Response:', response.data);

            setUser({
                username: newUsername,
                email: user.email,
                mobile: newMobile
            });
            setMessage('Changes saved successfully.');
            setIsEditing(false);
            setError('');
        } catch (error) {
            console.error("Error updating user data:", error);
            setMessage("Error updating user data. Please try again later.");
        }
    };

    const handleCancel = () => {
        setNewUsername(user.username);
        setNewMobile(user.mobile);
        setIsEditing(false);
        setError('');
    };

    const handleUsernameChange = (e) => {
        setNewUsername(e.target.value);
        setError('');
    };

    const handleMobileChange = (e) => {
        setNewMobile(e.target.value);
        setError('');
    };

    const validateUsername = (username) => {
        const regex = /^[a-zA-Z][a-zA-Z0-9]{3,}$/;
        return regex.test(username);
    };

    const validateMobile = (mobile) => {
        const regex = /^\d{10}$/;
        return regex.test(mobile);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100 bg-gradient-to-r from-blue-300 via-pink-250 to-orange-300">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">User Profile</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email:</label>
                    <p className="mt-1 w-full"><strong>{user.email}</strong></p>
                </div>
                <form>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-gray-700">Username:</label>
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
                        <label htmlFor="mobile" className="block text-gray-700">Mobile Number:</label>
                        <input
                            type="text"
                            id="mobile"
                            value={newMobile}
                            onChange={handleMobileChange}
                            readOnly={!isEditing}
                            className={`mt-1 p-2 border ${isEditing ? 'border-blue-500' : 'border-gray-300'} rounded w-full`}
                        />
                    </div>
                    {error && <p className="text-red-500 mb-3 text-center">{error}</p>}
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

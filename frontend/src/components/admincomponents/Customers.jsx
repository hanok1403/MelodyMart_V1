import React, { useEffect, useState } from 'react';
import Searchbar from './Searchbar';


const Customers = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState(null);
    const [results,setResults] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`/api/admin/customers`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                const filteredUsers = data.filter(user => user.role !== 'admin');
                setUsers(filteredUsers);
                setResults(filteredUsers);
            } catch (error) {
                setError(error.message);
                console.error("Error fetching data:", error);
            }
        };

        fetchUsers();
    }, []);

    const handleShowModal = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
        setShowModal(false);
    };

    return (
        <div className="p-6 bg-gradient-to-r from-blue-200 to-green-100 min-h-screen">
            <h1 className="text-3xl font-semibold text-center">Registered Users</h1>
            {error && <p className="text-red-500 mb-4">Error: {error}</p>}
            <Searchbar users={users} setResults={setResults}/>
            <div className="overflow-hidden border border-gray-200 shadow sm:rounded-lg mb-4 bg-gradient-to-r from-purple-100 to-gray-200">
                <ul>
                    {results.map((user, index) => (
                        <li key={user._id} className="border-t border-gray-200 hover:bg-gray-50">
                            <div className="px-4 py-4 sm:px-6 flex justify-between items-center">
                                <div className="text-sm font-medium text-indigo-600 truncate">{index + 1}. {user.username}</div>
                                <button
                                    onClick={() => handleShowModal(user)}
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Details
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {selectedUser && showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-middle bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-gradient-to-br from-gray-100 to-gray-200 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Customer Details</h3>
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500"><strong>Username:</strong> {selectedUser.username}</p>
                                    <p className="text-sm text-gray-500"><strong>Email:</strong> {selectedUser.email}</p>
                                    <p className="text-sm text-gray-500"><strong>Mobile Number:</strong> {selectedUser.mobileNumber}</p>
                                    <p className="text-sm text-gray-500"><strong>Role:</strong> {selectedUser.role}</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    onClick={handleCloseModal}
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Customers;
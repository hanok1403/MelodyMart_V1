import React, { useState } from 'react';

const UserFilter = ({ filteredUsers, setFilteredItems }) => {
  const [users, setUsers] = useState('');

  const handleChange = (value) => {
    setUsers(value);
    const filteredItems = filteredUsers.filter((user) =>
      user.userName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filteredItems);
  };

  return (
    <div className="flex justify-center items-center p-4 mb-3">
      <h3 className=''>Search Users:</h3>
      <input 
        type="text" 
        value={users}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search here..." 
        className="w-full max-w-md px-4 py-2 mx-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default UserFilter;

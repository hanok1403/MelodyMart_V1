import React, { useState } from 'react';
const Searchbar = () => {
    const [search, setSearch] = useState('');
    const filteredUsers = data.filter(user => user.role !== 'admin');
    const handlechange= (value)=>{
        setSearch(value);
        fetchData(value);
    }
  return (
    <div className="flex justify-center items-center p-4">
      <input 
        type="text" 
        value={search}
        onChange={(e)=>handlechange(e.target.value)}
        placeholder="Search here..." 
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default Searchbar;

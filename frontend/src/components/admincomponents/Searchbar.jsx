import React, { useState } from 'react';
const Searchbar = (props) => {
    const [search, setSearch] = useState('');
    const handlechange= (value)=>{
        setSearch(value);
        const filteredUsers = props.users.filter((user)=>{
            return user.username.toLowerCase().includes(value);
        });
        props.setResults(filteredUsers);
    }
  return (
    <div className="flex justify-center items-center p-4">
      <h3 className=''>Search user: </h3>
      <input 
        type="text" 
        value={search}
        onChange={(e)=>handlechange(e.target.value)}
        placeholder="Search here..." 
        className="w-full max-w-md px-4 py-2 mx-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default Searchbar;

// AdminSearchbar.jsx
import React, { useState } from 'react';

const AdminSearchbar = ({ products, setFilteredItems }) => {
  const [search, setSearch] = useState('');

  const handleChange = (value) => {
    setSearch(value);
    const filteredItems = products.filter((product) =>
      product.productName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(filteredItems);
  };

  return (
    <div className="flex justify-center items-center p-4 mb-3">
      <h3 className=''>Search products:</h3>
      <input 
        type="text" 
        value={search}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Search here..." 
        className="w-full max-w-md px-4 py-2 mx-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default AdminSearchbar;

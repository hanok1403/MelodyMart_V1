import React from 'react';
import '../../styles/MusicItem.css';

const MusicItem = () => {
  const handleCart = () => {
    // Add the data into cart database
  };

  const handleOrder = () => {
    // Add the data into order database
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4 m-4">
      <div className="h-48 flex items-center justify-center">
        <img src="url" alt="instrument" className="w-full h-full object-cover" />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">"title"</div>
        <p className="text-gray-700 text-base">"description"</p>
        <p className="text-gray-900 text-2xl font-bold mt-4">"price"</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <button onClick={handleCart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2 w-full">
          Add to Cart
        </button>
        <button onClick={handleOrder} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">
          Buy
        </button>
      </div>
    </div>
  );
};

export default MusicItem;

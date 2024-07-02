import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem';

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/home')
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.log(error));
  }, []);

  const filteredItems = items.filter(item => item.quantity > 0);

  return (
    <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((item, i) => (
            <div key={i} className="mb-4">
              <ProductItem product={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import '../../styles/home.css';
import ProductItem from './ProductItem';

const Home = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5001/home')
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      {/* <h1>This is Home page</h1> */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div key={i} className="mb-4">
              <ProductItem product={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

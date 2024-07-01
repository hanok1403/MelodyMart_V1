import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
          {items.map((item, i) => (
            <div key={i} className="col mb-4">
              <ProductItem product={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;

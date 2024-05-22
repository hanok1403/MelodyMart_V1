import React from 'react';
import '../styles/MusicItem.css'

const MusicItem = () => {
  return (
    <div className="card">
      <div className="card-img-container">
        <img src="https://images.pexels.com/photos/164936/pexels-photo-164936.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt='instrument' className="card-img" />
      </div>
      <div className="card-content">
        <h2 className="card-title">Instrument Name</h2>
        <p className="card-description">Small Description about product</p>
        <h1 className="card-price">Price</h1>
        <button className="btn">Add to Cart</button>
      </div>
    </div>
  );
}

export default MusicItem;

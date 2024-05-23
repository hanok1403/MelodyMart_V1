import React from 'react';
import '../styles/MusicItem.css';

const MusicItem = (props) => {
  return (
    <div className="card">
      <div className="card-img-container">
        <img src={props.img} alt='instrument' className="card-img" />
      </div>
      <div className="card-content">
        <h2 className="card-title">{props.info}</h2>
        <p className="card-description">{props.desc}</p>
        <h1 className="card-price">Price</h1>
        <button className="btn">Add to Cart</button>
      </div>
    </div>
  );
}

export default MusicItem;

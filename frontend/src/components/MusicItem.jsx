import React from 'react';
import '../styles/MusicItem.css';
const MusicItem = (props) => {
  const handleCart=()=>{
    //add the data into cart database;
  }
  const handleOrder=()=>{
    //add the data into order database;
  }
  return (
    <div className="card">
      <div className="card-img-container">
        <img src={props.img} alt='instrument' className="card-img" />
      </div>
      <div className="card-content">
        <h2 className="card-title">{props.info}</h2>
        <p className="card-description">{props.desc}</p>
        <h1 className="card-price">Price</h1>
        <button onClick={handleCart} className="btn">Add to Cart</button><br />
        <button onClick={handleOrder} className="btn">Buy</button>
      </div>
    </div>
  );
}

export default MusicItem;

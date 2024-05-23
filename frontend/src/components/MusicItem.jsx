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
    <div className="card" key={props.key}>
      <div className="card-img-container">
        <img src={props.product.imageUrl} alt='instrument' className="card-img" />
      </div>
      <div className="card-content">
        <h2 className="card-title">{props.product.productName}</h2>
        <p className="card-description">{props.product.description}</p>
        <h1 className="card-price">{props.product.price}</h1>
        <button onClick={handleCart} className="btn">Add to Cart</button><br />
        <button onClick={handleOrder} className="btn">Buy</button>
      </div>
    </div>
  );
}

export default MusicItem;

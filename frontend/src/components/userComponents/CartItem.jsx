import '../../styles/CartItem.css';
import React from 'react';

const CartItem = ({ item, onRemove }) => {
  const { productId, productName, price, quantity, imageUrl } = item;
  // console.log(item)

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this item from the cart?')) {
      onRemove(productId);
    }
  };

  return (
    <div className="cart-item">
      <img src={imageUrl} alt={productName} className="cart-item-image" />
      <div className="cart-item-details">
        <h3><b>Name:</b> {productName}</h3>
        <p><b>Price:</b> {price.toFixed(2)}</p>
        <p><b>Quantity:</b> {quantity}</p>
        <p className="cart-item-total">Total: ${(price * quantity).toFixed(2)}</p>
      </div>
      <button onClick={handleRemove} className="remove-button">&times;</button>
    </div>
  );
};

export default CartItem;
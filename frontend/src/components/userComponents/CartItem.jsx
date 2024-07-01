import '../../styles/CartItem.css';
import React from 'react';

const CartItem = ({ item, onRemove }) => {
  const { productId, name, price, quantity, imageUrl } = item;

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this item from the cart?')) {
      onRemove(productId);
    }
  };

  return (
    <div className="cart-item">
      <img src={imageUrl} alt={name} className="cart-item-image" />
      <div className="cart-item-details">
        <h3>{name}</h3>
        <p>Price: ${price.toFixed(2)}</p>
        <p>Quantity: {quantity}</p>
        <p className="cart-item-total">Total: ${(price * quantity).toFixed(2)}</p>
      </div>
      <button onClick={handleRemove} className="remove-button">&times;</button>
    </div>
  );
};

export default CartItem;
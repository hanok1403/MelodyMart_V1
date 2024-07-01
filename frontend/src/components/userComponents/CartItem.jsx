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
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4">
      {/* Left Section: Image, Name, Price, Total */}
      <div className="flex items-center">
        <img src={imageUrl} alt={name} className="w-24 h-24 object-cover rounded-md" />
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-gray-600">Price: ${price.toFixed(2)}</p>
          <p className="text-gray-800 font-bold">Total: ${(price * itemQuantity).toFixed(2)}</p>
        </div>
      </div>
      </div>
  );

export default CartItem;

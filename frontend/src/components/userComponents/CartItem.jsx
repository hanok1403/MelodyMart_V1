import React, { useState } from 'react';
import PropTypes from 'prop-types';

const CartItem = ({ item, onRemove }) => {
  const { productId, name, price, quantity, imageUrl } = item;

  // State for quantity
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this item from the cart?')) {
      onRemove(productId);
    }
  };

  const handleQuantityChange = (change) => {
    // Ensure quantity is at least 1 before updating
    const newQuantity = Math.max(1, itemQuantity + change);
    setItemQuantity(newQuantity);
    // Optionally, you can implement logic to update quantity in the cart here
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

      {/* Right Section: Quantity Controls and Remove Button */}
      <div className="flex items-center ml-4">
        {/* Quantity Controls */}
        <div className="flex items-center">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="text-gray-500 hover:text-gray-700 text-lg font-semibold px-2 py-1 border border-gray-300 rounded-l focus:outline-none"
          >
            -
          </button>
          <span className="px-4 py-1 text-gray-800 font-semibold">{itemQuantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="text-gray-500 hover:text-gray-700 text-lg font-semibold px-2 py-1 border border-gray-300 rounded-r focus:outline-none"
          >
            +
          </button>
        </div>

        {/* Remove from Cart Button */}
        <button
          onClick={handleRemove}
          className="ml-4 text-red-500 hover:text-red-700 text-lg font-bold focus:outline-none"
        >
          Remove from Cart
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    productId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default CartItem;

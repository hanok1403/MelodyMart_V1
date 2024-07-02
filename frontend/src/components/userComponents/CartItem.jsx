import React from 'react';

const CartItem = ({ item, onRemove }) => {
  const { productId, productName, price, quantity, imageUrl } = item;

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this item from the cart?')) {
      onRemove(productId);
    }
  };

  return (
    <div className="cart-item bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded-lg shadow-md p-4 mb-4 flex items-center">
      <img src={imageUrl} alt={productName} className="cart-item-image w-24 h-auto mr-4" />
      <div className="cart-item-details flex-1">
        <h3><b>Name:</b> {productName}</h3>
        <p><b>Price:</b> ${price.toFixed(2)}</p>
        <p><b>Quantity:</b> {quantity}</p>
        <p className="cart-item-total">Total: ${(price * quantity).toFixed(2)}</p>
      </div>
      <button onClick={handleRemove} className="remove-button text-red-600 hover:text-white-600 focus:outline-none">
        Remove from cart
      </button>
    </div>
  );
};

export default CartItem;

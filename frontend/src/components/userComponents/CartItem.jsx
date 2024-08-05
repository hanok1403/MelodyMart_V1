import React, { useEffect, useState } from 'react';

const CartItem = ({ item, onRemove, onUpdate }) => {
  const { productId, productName, price, quantity, imageUrl } = item;
  const [newQuantity, setNewQuantity] = useState(quantity);
  const [maxQuantity, setMaxQuantity] = useState(1);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetch(`/api/getProduct/${productId}`)
      .then(response => response.json())
      .then((data) => {
        setMaxQuantity(data[0].quantity);
      })
      .catch(err => console.log(err));
  }, [productId]);

  const handleRemove = () => {
    if (window.confirm('Are you sure you want to remove this item from the cart?')) {
      onRemove(productId);
    }
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(0, Math.min(parseInt(e.target.value), maxQuantity));
    setNewQuantity(value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    if (!newQuantity) {
      setNewQuantity(Math.min(maxQuantity, 1));
    }
    setIsEditing(false);
    onUpdate(productId, newQuantity);
  };

  return (
    <div className="cart-item bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded-lg shadow-md p-4 mb-4 flex items-center">
      <img src={imageUrl} alt={productName} className="cart-item-image w-24 h-auto mr-4" />
      <div className="cart-item-details flex-1">
        <h3><b>Name:</b> {productName}</h3>
        <p><b>Price:</b> ${price.toFixed(2)}</p>
        <div className="quantity-input flex items-center">
          <label htmlFor={`quantity-${productId}`}><b>Quantity:</b></label>
          <input
            type="number"
            id={`quantity-${productId}`}
            className="ml-2 shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={newQuantity}
            onChange={handleQuantityChange}
            disabled={!isEditing || maxQuantity === 0}
            min="0"
            max={maxQuantity}
          />
        </div>
        <p className="cart-item-total mt-2">Total: ${(price * newQuantity).toFixed(2)}</p>
        {maxQuantity === 0 && <p className="text-red-600 mt-2"><b>Out of Stock</b></p>}
      </div>
      {isEditing ? (
        <button
          onClick={handleSaveClick}
          className="save-button text-green-600 px-6 ml-2 hover:text-white hover:bg-green-600 focus:outline-none"
          disabled={maxQuantity === 0}
        >
          Save Quantity
        </button>
      ) : (
        <button
          onClick={handleEditClick}
          className="edit-button text-blue-600 px-6 ml-2 py-1 hover:text-white hover:bg-blue-600 rounded focus:outline-none"
          disabled={maxQuantity === 0}
        >
          Change Quantity
        </button>
      )}
      <button
        onClick={handleRemove}
        className="remove-button text-red-600 px-6 py-1 hover:text-white hover:bg-red-600 rounded focus:outline-none"
      >
        Remove from cart
      </button>
    </div>
  );
};

export default CartItem;

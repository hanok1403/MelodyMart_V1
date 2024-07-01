import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';

const Cart = () => {
  const [cart, setCart] = useState([]);

  const data = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch(`http://localhost:5001/cart/${data.user.id}`)
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.log(error));
  }, []);

  const handleRemoveItem = (productId) => {
    // Ensure user ID is correctly retrieved
  
    fetch(`http://localhost:5001/cart/itemDelete/${productId}`, {
      method: 'DELETE', // Use DELETE method
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: data.user.id
      })
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the cart state with the new cart data\
        console.log(data)
        setCart(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="cart-container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      {cart.map(item => (
        <CartItem
          key={item.productId}
          item={item}
          onRemove={handleRemoveItem}
        />
      ))}
      <div className="text-right mt-4">
        <h3 className="text-xl font-semibold">
          Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default Cart;
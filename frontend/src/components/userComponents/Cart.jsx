import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:5001/cart/${user.user.id}`)
        .then(response => response.json())
        .then(data => setCart(data))
        .catch(error => console.log(error));
    }
  }, [user]); // Include user in dependency array to fetch cart when user changes

  const handleRemoveItem = (productId) => {
    // Update cart state by filtering out the item to remove
    setCart(cart.filter(item => item.productId !== productId));
  };

  const handleQuantityChange = (productId, change) => {
    // Update cart state by mapping over items and adjusting quantity of the matching product
    setCart(cart.map(item =>
      item.productId === productId ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    ));
  };

  return (
    <div className="shopping-cart">
      <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
      {cart.map(item => (
        <CartItem
          key={item.productId}
          item={item}
          onRemove={handleRemoveItem}
          onQuantityChange={handleQuantityChange}
        />
      ))}
      <div className="cart-total mt-8">
        <h3 className="text-xl font-semibold">
          Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
        </h3>
      </div>
    </div>
  );
};

export default Cart;

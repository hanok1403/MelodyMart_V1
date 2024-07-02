import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const data = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5001/cart/${data.user.id}`)
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.log(error));
  }, [data.user.id]);

  const handleRemoveItem = (productId) => {
    fetch(`http://localhost:5001/cart/itemDelete/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: data.user.id
      })
    })
      .then((response) => response.json())
      .then((data) => {
        setCart(data);
      })
      .catch((error) => console.log(error));
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout');
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
        <button
          className='btn bg-blue-500 text-white py-2 px-4 mt-4 text-center rounded-md hover:bg-blue-600'
          onClick={handleProceedToCheckout}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

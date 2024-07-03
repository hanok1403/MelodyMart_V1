import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import { SentimentDissatisfied } from '@mui/icons-material';
import CartItem from './CartItem';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const data = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.user && data.user.id) {
      fetch(`http://localhost:5001/cart/${data.user.id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch cart items');
          }
          return response.json();
        })
        .then((data) => setCart(data))
        .catch((error) => console.error('Error fetching cart:', error));
    }
  }, [data]);

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
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete item from cart');
        }
        return response.json();
      })
      .then((data) => {
        setCart(data);
      })
      .catch((error) => console.error('Error removing item:', error));
  };

  const handleProceedToCheckout = () => {
    console.log("Proceed to checkout clicked"); 
    navigate('/checkout');
  };

  return (
    <div className="cart-container mx-auto p-4 bg-gradient-to-r from-blue-300 via-pink-250 to-orange-300 min-h-screen flex flex-col">
      <h2 className="text-2xl font-semibold mb-4 text-center">Shopping Cart</h2>
      {cart.length === 0 ? (
        <Box className="flex flex-col items-center justify-center flex-grow">
          <SentimentDissatisfied style={{ fontSize: 100, color: '#9e9e9e' }} />
          <Typography variant="h6" className="mt-4 text-gray-600">
            You have not added anything to the cart yet.
          </Typography>
        </Box>
      ) : (
        <>
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
              className='btn bg-blue-500 text-white  px-4 mt-4 text-center rounded-md hover:bg-blue-600'
              onClick={handleProceedToCheckout}
            >
              Proceed to checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

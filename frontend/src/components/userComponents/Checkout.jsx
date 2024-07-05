import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const navigate = useNavigate();
  
  const data = JSON.parse(localStorage.getItem('user'));

  const handleCheckout = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm('Do you really want to place the order?');

    if (!confirmed) {
      return;
    }

    const orderData = {
      userId: data.user.id,
      userName:data.user.username,
      address: shippingAddress,
      paymentType: paymentMethod
    };

    try {
      const response = await fetch('http://localhost:5001/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderData)
      });

      const result = await response.json();
      if (response.ok) {
        // console.log('Order placed successfully:', result);
        
        navigate('/orders');
      } else {
        console.error('Error placing order:', result);
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="checkout-container mx-auto p-4 max-w-md">
      <h2 className="text-2xl font-semibold text-center mb-4">Checkout</h2>
      <form onSubmit={handleCheckout}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Shipping Address
          </label>
          <input
            id="address"
            type="text"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="paymentMethod">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="Cash on Delivery">Cash on Delivery</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 text-center rounded-md hover:bg-blue-600"
        >
          Complete Purchase
        </button>
      </form>
    </div>
  );
};

export default Checkout;
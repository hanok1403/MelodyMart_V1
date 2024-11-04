import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const navigate = useNavigate();
  const locater = useLocation();

  const data = JSON.parse(localStorage.getItem('user'));
  const { orderData } = locater.state;

  const handleCheckout = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm('Do you really want to place the order?');

    if (!confirmed) {
      return;
    }

    const orders = {
      userId: data.user.id,
      userName: data.user.username,
      cartData: orderData,
      address: shippingAddress,
      paymentType: paymentMethod
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orders)
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Order placed successfully!!', {
          onClose: () => navigate('/orders')
        });
      } else {
        toast.error('Error placing order!');
        console.error('Error placing order:', result);
      }
    } catch (error) {
      toast.error('Error placing order!');
      console.error('Error placing order:', error);
    }
  };

  return (
    <div className="checkout-container bg-gradient-to-br h-screen flex items-center justify-center from-purple-300 to-orange-300">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
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
            className="bg-blue-500 text-white py-2 px-4 text-center rounded-md hover:bg-blue-600 w-full"
          >
            Complete Purchase
          </button>
        </form>
      </div>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Checkout;

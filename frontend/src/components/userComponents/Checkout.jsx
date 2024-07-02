import React, { useState } from 'react';

const Checkout = () => {
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentInfo, setPaymentInfo] = useState('');

  const handleCheckout = (e) => {
    e.preventDefault();
    // Handle checkout logic here
    console.log('Shipping Address:', shippingAddress);
    console.log('Payment Info:', paymentInfo);
  };

  return (
    <div className="checkout-container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
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
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="payment">
            Payment Information
          </label>
          <input
            id="payment"
            type="text"
            value={paymentInfo}
            onChange={(e) => setPaymentInfo(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="btn bg-blue-500 text-white py-2 px-4 text-center rounded-md hover:bg-blue-600"
        >
          Complete Purchase
        </button>
      </form>
    </div>
  );
};

export default Checkout;

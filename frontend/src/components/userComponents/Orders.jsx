import { SentimentDissatisfied } from '@mui/icons-material';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const data = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch(`http://localhost:5001/orders/${data.user.id}`)
      .then((response) => response.json())
      .then((data) => setOrders(data.reverse()))
      .catch((error) => console.log(error));
  }, [data.user.id]);

  const handleCancelOrder = (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      fetch(`http://localhost:5001/orders/cancel/${orderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: data.user.id })
      })
        .then((response) => response.json())
        .then((updatedOrders) => setOrders(updatedOrders.reverse()))
        .catch((error) => console.log(error));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'order placed':
        return '#b59c0b';
      case 'Completed':
        return 'green';
      case 'Cancelled':
        return 'red';
      default:
        return 'white';
    }
  };

  return (
    <div className="orders-container mx-auto p-4 w-full bg-gradient-to-r from-purple-300  to-blue-300 via-gray-250 min-h-screen flex flex-col">
      <h2 className="text-2xl font-semibold text-center mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <Box className="flex flex-col items-center justify-center flex-grow">
          <SentimentDissatisfied style={{ fontSize: 100, color: '#9e9e9e' }} />
          <Typography variant="h6" className="mt-4 text-gray-600">
            You have no orders yet.
          </Typography>
        </Box>
      ) : (
        <div className="overflow-x-auto flex-grow">
          <TableContainer component={Paper}>
            <Table className="min-w-full">
              <TableHead>
                <TableRow>
                  <TableCell className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs md:text-sm uppercase font-medium text-gray-700">Order ID</TableCell>
                  <TableCell className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs md:text-sm uppercase font-medium text-gray-700">Order Date</TableCell>
                  <TableCell className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs md:text-sm uppercase font-medium text-gray-700">Total Cost</TableCell>
                  <TableCell className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs md:text-sm uppercase font-medium text-gray-700">Payment Status</TableCell>
                  <TableCell className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs md:text-sm uppercase font-medium text-gray-700">Status</TableCell>
                  <TableCell className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs md:text-sm uppercase font-medium text-gray-700">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="py-2 px-4 border-b border-gray-200 text-xs md:text-sm">{order.orderId}</TableCell>
                    <TableCell className="py-2 px-4 border-b border-gray-200 text-xs md:text-sm">{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell className="py-2 px-4 border-b border-gray-200 text-xs md:text-sm">${order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell className="py-2 px-4 border-b border-gray-200 text-xs md:text-sm">{order.paymentType}</TableCell>
                    <TableCell className="py-2 px-4 border-b border-gray-200 text-xs md:text-sm">
                      <div
                        className="rounded-md p-2 text-white"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {order.status}
                      </div>
                    </TableCell>
                    <TableCell className="py-2 px-4 border-b border-gray-200 text-xs md:text-sm">
                      {order.status === 'order placed' && (
                        <Button 
                          variant="contained" 
                          color="secondary" 
                          onClick={() => handleCancelOrder(order._id)}
                        >
                          Cancel
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
};

export default Orders;

import { MoreVert as MoreVertIcon, SentimentDissatisfied } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UserFilter from './UserFilter';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [result, setResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const data = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    fetch(`http://localhost:5001/admin/orders`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data.reverse());
        setResults(data.reverse());
      })
      .catch((error) => console.log(error));
  }, [data.user.id]);

  const handleMenuOpen = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleCancelOrder = () => {
    if(!window.confirm("Do you want to cancel the order?")===true)
      return ;
    if (selectedOrderId) {
      fetch(`http://localhost:5001/admin/orders/cancel/${selectedOrderId}`, {
        method: 'PUT',
      })
        .then((response) => response.json())
        .then((updatedOrder) => {
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === updatedOrder._id ? updatedOrder : order
            )
          );
          setResults(orders);
          handleMenuClose();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleShippedOrder = () => {
    if(!window.confirm("Is the product shipped?")===true)
      return ;
    if (selectedOrderId) {
      fetch(`http://localhost:5001/admin/orders/shipped/${selectedOrderId}`, {
        method: 'PUT',
      })
        .then((response) => response.json())
        .then((updatedOrder) => {
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === updatedOrder._id ? updatedOrder : order
            )
          );
          setResults(orders);
          handleMenuClose();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleCompleteOrder = () => {
    if(!window.confirm("Do you want to complete the order?")===true)
      return ;
    if (selectedOrderId) {
      fetch(`http://localhost:5001/admin/orders/complete/${selectedOrderId}`, {
        method: 'PUT',
      })
        .then((response) => response.json())
        .then((updatedOrder) => {
          console.log("Order completed:", updatedOrder); 
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === updatedOrder._id ? updatedOrder : order
            )
          );
          setResults(orders);
          handleMenuClose();
        })
        .catch((error) => console.log(error));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'order placed':
        return '#b59c0b';
      case 'Shipped':
        return 'orange';
      case 'Completed':
        return 'green';
      case 'Cancelled':
        return 'red';
      default:
        return 'white';
    }
  };

  return (
    <div className="orders-container mx-auto p-4 w-full bg-gradient-to-r from-blue-300 via-pink-250 to-orange-300">
      <h2 className="text-2xl font-semibold text-center mb-4">Your Orders</h2>
      <UserFilter filteredUsers={orders} setFilteredItems={setResults}/>
      {result.length === 0 ? (
        <Box className="flex flex-col items-center justify-center mt-10">
          <SentimentDissatisfied style={{ fontSize: 100, color: '#9e9e9e' }} />
          <Typography variant="h6" className="mt-4 text-gray-600">
            You have no orders yet.
          </Typography>
        </Box>
      ) : (
        
        <div className="overflow-x-auto">
          
          <TableContainer component={Paper}>
            <Table className="min-w-full">
              <TableHead>
                <TableRow>
                  <TableCell className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs md:text-sm uppercase font-medium text-gray-700" style={{ width: '20%' }}>Order ID</TableCell>
                  <TableCell className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs md:text-sm uppercase font-medium text-gray-700">Order Date</TableCell>
                  <TableCell className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs md:text-sm uppercase font-medium text-gray-700">Username</TableCell>
                  <TableCell className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs md:text-sm uppercase font-medium text-gray-700" style={{ width: '30%' }}>Address</TableCell>
                  <TableCell className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs md:text-sm uppercase font-medium text-gray-700">Total Cost</TableCell>
                  <TableCell className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs md:text-sm uppercase font-medium text-gray-700">Payment Status</TableCell>
                  <TableCell className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs md:text-sm uppercase font-medium text-gray-700">Status</TableCell>
                  <TableCell className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-xs md:text-sm uppercase font-medium text-gray-700">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="py-2 px-4 border-b border-gray-200 text-xs md:text-sm" style={{ width: '20%' }}>{order.orderId}</TableCell>
                    <TableCell className="py-2 px-4 border-b border-gray-200 text-xs md:text-sm">{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell className="py-2 px-4 border-b border-gray-200 text-xs md:text-sm">{order.userName}</TableCell>
                    <TableCell className="py-2 px-4 border-b border-gray-200 text-xs md:text-sm" style={{ width: '30%' }}>{order.address}</TableCell>
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
                      {order.status !== 'Cancelled' && order.status !== 'Completed' && (
                        <>
                          <IconButton onClick={(event) => handleMenuOpen(event, order._id)}>
                            <MoreVertIcon />
                          </IconButton>
                          <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl) && selectedOrderId === order._id}
                            onClose={handleMenuClose}
                          >
                            <MenuItem onClick={handleCancelOrder} disabled={order.status === 'Cancelled'}>
                              Cancel Order
                            </MenuItem>
                            <MenuItem onClick={handleShippedOrder} disabled={order.status === 'Shipped'}>
                              Order Shipped
                            </MenuItem>
                            <MenuItem onClick={handleCompleteOrder} disabled={order.status === 'Completed'}>
                              Mark as Completed
                            </MenuItem>
                          </Menu>
                        </>
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

export default OrderList;

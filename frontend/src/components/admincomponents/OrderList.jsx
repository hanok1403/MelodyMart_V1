import { MoreVert as MoreVertIcon, SentimentDissatisfied } from '@mui/icons-material';
import { Box, Button, IconButton, Menu, MenuItem, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import UserFilter from './UserFilter';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [result, setResults] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/orders`)
      .then((response) => response.json())
      .then((data) => {
        setOrders(data);
        setResults(data.reverse());
      })
      .catch((error) => console.log(error));
  }, []);

  const handleMenuOpen = (event, orderId) => {
    setAnchorEl(event.currentTarget);
    setSelectedOrderId(orderId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedOrderId(null);
  };

  const handleCancelOrder = () => {
    if (!window.confirm("Do you want to cancel the order?") === true)
      return;
    if (selectedOrderId) {
      fetch(`/api/admin/orders/cancel/${selectedOrderId}`, {
        method: 'PUT',
      })
        .then((response) => response.json())
        .then((updatedOrder) => {
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === updatedOrder._id ? updatedOrder : order
            )
          );
          setResults((prevResults) =>
            prevResults.map((order) =>
              order._id === updatedOrder._id ? updatedOrder : order
            )
          );
          handleMenuClose();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleShippedOrder = () => {
    if (!window.confirm("Is the product shipped?") === true)
      return;
    if (selectedOrderId) {
      fetch(`/api/admin/orders/shipped/${selectedOrderId}`, {
        method: 'PUT',
      })
        .then((response) => response.json())
        .then((updatedOrder) => {
          setOrders((prevOrders) =>
            prevOrders.map((order) =>
              order._id === updatedOrder._id ? updatedOrder : order
            )
          );
          setResults((prevResults) =>
            prevResults.map((order) =>
              order._id === updatedOrder._id ? updatedOrder : order
            )
          );
          handleMenuClose();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleCompleteOrder = () => {
    if (!window.confirm("Do you want to complete the order?") === true)
      return;
    if (selectedOrderId) {
      fetch(`/api/admin/orders/complete/${selectedOrderId}`, {
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
          setResults((prevResults) =>
            prevResults.map((order) =>
              order._id === updatedOrder._id ? updatedOrder : order
            )
          );
          handleMenuClose();
        })
        .catch((error) => console.log(error));
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedOrder(null);
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
    <div className="orders-container mx-auto p-4 w-full bg-gradient-to-r from-blue-200 to-green-100 min-h-screen">
      <h2 className="text-2xl font-semibold text-center mb-4">Your Orders</h2>
      <UserFilter filteredUsers={orders} setFilteredItems={setResults} />
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
              <TableHead className="sticky top-0 bg-gray-100 z-10">
                <TableRow>
                  <TableCell className="py-2 px-4 border-b border-gray-200 text-center text-xs md:text-sm uppercase font-medium text-gray-700" style={{ width: '20%' }}>Order ID</TableCell>
                  <TableCell className="py-2 px-4 border-b border-gray-200 text-center text-xs md:text-sm uppercase font-medium text-gray-700">Order Date</TableCell>
                  <TableCell className="py-2 px-4 border-b border-gray-200 text-center text-xs md:text-sm uppercase font-medium text-gray-700">Username</TableCell>
                  <TableCell className="py-2 px-4 border-b border-gray-200 text-center text-xs md:text-sm uppercase font-medium text-gray-700" style={{ width: '30%' }}>Address</TableCell>
                  <TableCell className="py-2 px-4 border-b border-gray-200 text-center text-xs md:text-sm uppercase font-medium text-gray-700">Total Cost</TableCell>
                  <TableCell className="py-2 px-4 border-b border-gray-200 text-center text-xs md:text-sm uppercase font-medium text-gray-700">Payment Status</TableCell>
                  <TableCell className="py-2 px-4 border-b border-gray-200 text-center text-xs md:text-sm uppercase font-medium text-gray-700">Status</TableCell>
                  <TableCell className="py-2 px-4 border-b border-gray-200 text-center text-xs md:text-sm uppercase font-medium text-gray-700">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {result.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => (
                  <TableRow key={order._id}>
                    <TableCell className="py-2 px-4 border-b border-gray-200 text-center text-xs md:text-sm" style={{ width: '20%' }}>{order.orderId}</TableCell>
                    <TableCell className="py-2 px-4 border-b border-gray-200 text-center text-xs md:text-sm">{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell className="py-2 px-4 border-b border-gray-200 text-center text-xs md:text-sm">{order.userName}</TableCell>
                    <TableCell className="py-2 px-4 border-b border-gray-200 text-center text-xs md:text-sm" style={{ width: '30%' }}>{order.address}</TableCell>
                    <TableCell className="py-2 px-4 border-b border-gray-200 text-center text-xs md:text-sm">${order.totalPrice.toFixed(2)}</TableCell>
                    <TableCell className="py-2 px-4 border-b border-gray-200 text-center text-xs md:text-sm">{order.paymentType}</TableCell>
                    <TableCell className="py-2 px-4 border-b border-gray-200 text-center text-xs md:text-sm">
                      <div
                        className="rounded-md p-2 text-white"
                        style={{ backgroundColor: getStatusColor(order.status) }}
                      >
                        {order.status}
                      </div>
                    </TableCell>
                    <TableCell className="py-2 px-4 border-b border-gray-200 text-xs md:text-sm">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenModal(order)}
                        className="mx-1"
                      >
                        Details
                      </Button>
                      <IconButton
                        onClick={(event) => handleMenuOpen(event, order._id)}
                      >
                        {order.status !== "Completed" && order.status !== "Cancelled" && (<MoreVertIcon />)}
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl && selectedOrderId === order._id)}
                        onClose={handleMenuClose}
                      >
                        {order.status === 'order placed' && (
                          <MenuItem onClick={handleShippedOrder}>Mark as Shipped</MenuItem>
                        )}
                        {order.status === 'Shipped' && (
                          <MenuItem onClick={handleCompleteOrder}>Mark as Complete</MenuItem>
                        )}
                        {order.status !== 'Cancelled' && order.status !== 'Completed' && (
                          <MenuItem onClick={handleCancelOrder}>Cancel Order</MenuItem>
                        )}
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={result.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
      )}

      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="order-details-modal-title"
        aria-describedby="order-details-modal-description"
      >
        <Box
          sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', maxHeight: '90%', bgcolor: 'background.paper', border: '2px solid #000', borderRadius: '2', boxShadow: 24, p: 4, overflowY: 'auto' }}
        >
          <Typography id="order-details-modal-title" variant="h6" component="h2">
            Order Details
          </Typography>
          {selectedOrder && (
            <Box id="order-details-modal-description" sx={{ mt: 2 }}>
              <Typography variant="subtitle1">
                <strong>Order ID:</strong> {selectedOrder.orderId}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Order Date:</strong> {new Date(selectedOrder.orderDate).toLocaleDateString()}
              </Typography>
              <Typography variant="subtitle1">
                <strong>User:</strong> {selectedOrder.userName}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Address:</strong> {selectedOrder.address}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Total Cost:</strong> ${selectedOrder.totalPrice.toFixed(2)}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Payment Type:</strong> {selectedOrder.paymentType}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Status:</strong> {selectedOrder.status}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Ordered Items:</strong>
              </Typography>
              <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>Product Name</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Price</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.cartData.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <img src={item.imageUrl} alt={item.productName} style={{ width: '50px', height: '50px' }} />
                        </TableCell>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button 
              variant="contained" 
              color="primary" 
              onClick={handleCloseModal} 
              sx={{ mt: 2, display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            >
              Close
            </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default OrderList;

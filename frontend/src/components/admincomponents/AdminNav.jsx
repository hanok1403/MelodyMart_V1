import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Router/AuthProvider';
import { Navbar, Nav } from 'react-bootstrap';
import '../../styles/NavStyle.css'; // Custom styles
import AddProduct from './AddProduct';
import Admindashboard from './Admindashboard';
import OrderList from './OrderList';
import EditProduct from './EditProduct';
import Customers from './Customers';

const AdminNav = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logoutAction();
    navigate('/login');
  };

  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark" className="shadow-sm custom-navbar">
        <Navbar.Brand as={Link} to="/admin/dashboard" className="custom-navbar-brand px-3">Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin/dashboard" className="custom-nav-link">Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/admin/addProduct" className="custom-nav-link">Add Products</Nav.Link>
            <Nav.Link as={Link} to="/admin/orders" className="custom-nav-link">Orders</Nav.Link>
            <Nav.Link as={Link} to="/admin/customers" className="custom-nav-link">Customers</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={handleLogout} className="custom-logout-button ml-3 px-3 mr-3">Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/dashboard" element={<Admindashboard />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/editProduct" element={<EditProduct />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
    </div>
  );
};

export default AdminNav;

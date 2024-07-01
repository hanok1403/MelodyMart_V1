import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Router/AuthProvider';
import Home from './Home';
import Profile from '../Profile';
import Cart from './Cart';
import Orders from './Orders';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'; 

const NavBar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logoutAction();
    navigate('/login');
  };

  return (
    <div>
      <Navbar bg="dark" expand="lg" variant='dark' className="shadow-sm custom-navbar">
        <Navbar.Brand href="/" className="custom-navbar-brand px-3">MelodyMart</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home" className="custom-nav-link">Home</Nav.Link>
            <Nav.Link as={Link} to="/cart" className="custom-nav-link">Cart</Nav.Link>
            <Nav.Link as={Link} to="/orders" className="custom-nav-link">Orders</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              title={<FontAwesomeIcon icon={faUserCircle} className="custom-nav-link" />}
              id="basic-nav-dropdown"
              align="end" 
              renderMenuOnMount={true}
              className="d-none d-lg-block"
            >
              <NavDropdown.Item as={Link} to="/profile" className="custom-nav-link profile-link">Profile</NavDropdown.Item>
              <NavDropdown.Item className="custom-logout-button" onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Menu"
              id="basic-nav-dropdown"
              align="end" 
              renderMenuOnMount={true}
              className="d-lg-none"
            >
  
              {/* <NavDropdown.Item as={Link} to="/home" className="custom-nav-link">Home</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cart" className="custom-nav-link">Cart</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/orders" className="custom-nav-link">Orders</NavDropdown.Item> */}
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/profile" className="custom-nav-link profile-link">Profile</NavDropdown.Item>
              <NavDropdown.Item className="custom-logout-button" onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default NavBar;

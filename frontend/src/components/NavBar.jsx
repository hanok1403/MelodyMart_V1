import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../styles/NavStyle.css";
import AddProduct from "./AddProduct";
import Admin from "./Admin";
import Cart from "./Cart";
import Customer from './Customer';
import Home from "./Home";
import Orders from "./Orders";
import Profile from "./Profile";
import Register from "./Register";
const NavBar = () => {
  return (
    <div>
      <Router>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/">To Home</Link>
          </li>
          <li>
            <Link to="/profile">To Profile</Link>
          </li>
          <li>
            <Link to="/login">customer</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/addProduct">AddProduct</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Customer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/addProduct" element={<AddProduct />} />
      </Routes>
    </Router>
    </div>
  )
}

export default NavBar;

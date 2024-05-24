import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../styles/NavStyle.css";
import Cart from "./Cart";
import Customer from './Customer';
import Home from "./Home";
import Orders from "./Orders";
import Profile from "./Profile";
import Register from "./Register";
import Admindashboard from './admincomponents/Admindashboard';
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
            <Link to="/customer">customer</Link>
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
            <Link to="/admin/*">Admin</Link>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin/*" element={<Admindashboard />} />
      </Routes>
    </Router>
    </div>
  )
}

export default NavBar;

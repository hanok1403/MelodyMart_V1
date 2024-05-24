import React from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "../../styles/NavStyle.css";
import Login from '../Login';
import Profile from "../Profile";
import Register from "../Register";
import Cart from "./Cart";
import Orders from "./Orders";
import Admin from "../Admin";

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
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
      <Routes>
        {/* <Route path="/" element={<Home1 />} /> */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
    </div>
  )
}

export default NavBar;
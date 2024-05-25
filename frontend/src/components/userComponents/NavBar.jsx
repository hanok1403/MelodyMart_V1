import React from 'react';
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import "../../styles/NavStyle.css";
import Profile from "../Profile";
import Cart from "./Cart";
import Orders from "./Orders";
import { useAuth } from '../../Router/AuthProvider';

const NavBar = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logoutAction();
    navigate('/login');
  };

  return (
    <div>
      <div className="navbar">
        <ul>
          <li>
            <Link to="/profile">To Profile</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </div>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </div>
  )
}

export default NavBar;

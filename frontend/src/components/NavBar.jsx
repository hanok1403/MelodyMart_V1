import React from 'react'
import { Link, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AddProduct from "./AddProduct";
import Admin from "./Admin";
import Cart from "./Cart";
import DashBoard from "./DashBoard";
import Home from "./Home";
import Login from "./Login";
import Orders from "./Orders";
import Register from "./Register";

const NavBar = () => {
  return (
    <>
        <Router>
        <ul>
          <li>
            <Link to="/">To Home</Link>
          </li>
          <li>
            <Link to="/dashboard">To Profile</Link>
          </li>
          <li>
            <Link to="/login"> Login </Link>
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/addProduct" element={<AddProduct />} />
        </Routes>
      </Router>
    </>
  )
}

export default NavBar

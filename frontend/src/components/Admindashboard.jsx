import React from 'react';
import { Link } from "react-router-dom";
const Admindashboard = () => {
  return (
    <div>
      <ul>
          <li>
            <Link to="/">To Home</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
          <li>
            <Link to="/addproduct">Add Product</Link>
          </li>
        </ul>
    </div>
  )
}

export default Admindashboard;

import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import AddProduct from './AddProduct';
import Admindashboard from './Admindashboard';
import OrderList from './OrderList';
function AdminNav() {
  return (
    <div>
    <div className='navbar'>
      <nav>
        <ul>
          <li>
            <Link to="/admin/dashboard">DashBoard</Link>
          </li>
          <li>
            <Link to="/admin/addProduct">Add Products</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
        </ul>
      </nav>
      </div>
      <Routes>
        <Route path="/dashboard" element={<Admindashboard />} />
        <Route path="/addProduct" element={<AddProduct />} />
        {/* <Route path="/admin/productEdit/:productId" element={<ProductEdit />} /> */}
        <Route path="/orders" element={<OrderList />} />
      </Routes>
    </div>
  );
}

export default AdminNav;

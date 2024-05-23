import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import AddProduct from './AddProduct';
import OrderList from './OrderList';
import Admindashboard from './Admindashboard';

function AdminNav() {
  return (
    <div className='navbar'>
      <nav>
        <ul>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/admin/addProduct">Add Products</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/admin" element={<Admindashboard />} />
        <Route path="/admin/addProduct" element={<AddProduct />} />
        {/* <Route path="/admin/productEdit/:productId" element={<ProductEdit />} /> */}
        <Route path="/admin/orders" element={<OrderList />} />
      </Routes>
    </div>
  );
}

export default AdminNav;

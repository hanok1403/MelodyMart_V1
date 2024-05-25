import React from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Router/AuthProvider';
import '../../styles/NavStyle.css'; // Assuming you have a common stylesheet
import AddProduct from './AddProduct';
import Admindashboard from './Admindashboard';
import OrderList from './OrderList';

function AdminNav() {
  const auth = useAuth();
  const navigate = useNavigate();

  

  const handleLogout = () => {
    auth.logoutAction();
    navigate('/login');
  };

  return (
    <div>
      <nav className='navbar'>
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
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/dashboard" element={<Admindashboard />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/editProduct" element={<EditProduct />} />
      </Routes>
    </div>
  );
}

export default AdminNav;

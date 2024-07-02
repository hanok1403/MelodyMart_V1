import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Router/AuthProvider';
import Admindashboard from './Admindashboard';
import AddProduct from './AddProduct';
import OrderList from './OrderList';
import EditProduct from './EditProduct';
import Customers from './Customers';

const AdminNav = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.logoutAction();
    navigate('/login');
  };

  return (
    <div>
      <nav className="bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/admin/dashboard" className="text-white text-3xl font-bold px-3">Admin Panel</Link>
            </div>
            <div className="hidden md:flex ml-10 space-x-4">
              <div className="flex space-x-4">
                <Link to="/admin/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Dashboard</Link>
                <Link to="/admin/addProduct" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Add Products</Link>
                <Link to="/admin/orders" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Orders</Link>
                <Link to="/admin/customers" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-lg font-medium">Customers</Link>
              </div>
            </div>
            <div className="ml-auto pr-4 flex items-center">
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-white px-3 py-2 rounded-md text-lg font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/dashboard" element={<Admindashboard />} />
        <Route path="/addProduct" element={<AddProduct />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="/editProduct" element={<EditProduct />} />
        <Route path="/customers" element={<Customers />} />
      </Routes>
    </div>
  );
};

export default AdminNav;

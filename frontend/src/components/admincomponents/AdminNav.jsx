import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Router/AuthProvider';
import Admindashboard from './Admindashboard';
import AddProduct from './AddProduct';
import OrderList from './OrderList';
import EditProduct from './EditProduct';
import Customers from './Customers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const AdminNav = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    auth.logoutAction();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      <nav className="bg-gray-800 shadow-sm">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link to="/admin/dashboard" className="text-white text-3xl font-bold">Admin Panel</Link>
            <div className="hidden md:flex ml-10 space-x-4">
              <Link to="/admin/dashboard" className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-lg font-medium">Dashboard</Link>
              <Link to="/admin/addProduct" className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-lg font-medium">Add Products</Link>
              <Link to="/admin/orders" className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-lg font-medium">Orders</Link>
              <Link to="/admin/customers" className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-lg font-medium">Customers</Link>
            </div>
          </div>
          <div className="hidden md:flex ml-auto">
            <button
              onClick={handleLogout}
              className="text-red-600 hover:text-white px-4 py-2 rounded-md text-lg font-medium"
            >
              Logout
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="text-gray-300 hover:text-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 py-2">
            <div className="flex flex-col items-center space-y-2">
              <Link
                to="/admin/dashboard"
                className="text-white text-lg font-medium hover:text-gray-300 py-2 block w-full text-center"
                onClick={closeMobileMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/addProduct"
                className="text-white text-lg font-medium hover:text-gray-300 py-2 block w-full text-center"
                onClick={closeMobileMenu}
              >
                Add Products
              </Link>
              <Link
                to="/admin/orders"
                className="text-white text-lg font-medium hover:text-gray-300 py-2 block w-full text-center"
                onClick={closeMobileMenu}
              >
                Orders
              </Link>
              <Link
                to="/admin/customers"
                className="text-white text-lg font-medium hover:text-gray-300 py-2 block w-full text-center"
                onClick={closeMobileMenu}
              >
                Customers
              </Link>
              <button
                className="text-red-600 text-lg font-medium hover:bg-red-100 hover:text-red-400 w-full text-left py-2 text-center"
                onClick={() => { handleLogout(); closeMobileMenu(); }}
              >
                Logout
              </button>
            </div>
          </div>
        )}
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

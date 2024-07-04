import React, { useState, useEffect, useRef } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Router/AuthProvider';
import Home from './Home';
import Profile from '../Profile';
import Cart from './Cart';
import Orders from './Orders';
import Checkout from './Checkout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ChangePassword from './ChangePassword';
import { faUserCircle, faBars } from '@fortawesome/free-solid-svg-icons'; 

const NavBar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    auth.logoutAction();
    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
            <Link to="/home" className="text-white text-3xl font-bold">MelodyMart</Link>
            <div className="hidden md:flex ml-10 space-x-4">
              <Link to="/home" className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-lg font-medium">Home</Link>
              <Link to="/cart" className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-lg font-medium">Cart</Link>
              <Link to="/orders" className="text-gray-300 hover:text-white px-4 py-2 rounded-md text-lg font-medium">Orders</Link>
            </div>
          </div>
          <div className="hidden md:flex ml-3 relative" ref={dropdownRef}>
            <div>
              <button
                className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                id="user-menu-button"
                aria-haspopup="true"
                onClick={toggleDropdown}
              >
                <FontAwesomeIcon icon={faUserCircle} className="text-white text-2xl" />
              </button>
              {dropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                  <Link to="/profile" className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-100">Profile</Link>
                  <Link to="/changePassword" className="block px-4 py-2 text-sm text-blue-700 hover:bg-blue-100">Change Password</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100">Logout</button>
                </div>
              )}
            </div>
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
                to="/home"
                className="text-white text-lg font-medium hover:text-gray-300 py-2 block w-full text-center"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                to="/cart"
                className="text-white text-lg font-medium hover:text-gray-300 py-2 block w-full text-center"
                onClick={closeMobileMenu}
              >
                Cart
              </Link>
              <Link
                to="/orders"
                className="text-white text-lg font-medium hover:text-gray-300 hover:text-blue-400 py-2 block w-full text-center"
                onClick={closeMobileMenu}
              >
                Orders
              </Link>
              <Link
                to="/profile"
                className="text-blue-700 text-lg font-medium hover:bg-blue-100 hover:text-blue-400 py-2 block w-full text-center"
                onClick={() => { closeMobileMenu(); toggleDropdown(); }}
              >
                Profile
              </Link>
              <Link
                to="/changePassword"
                className="text-blue-700 text-lg font-medium hover:bg-blue-100 hover:text-blue-400 py-2 block w-full text-center"
                onClick={() => { closeMobileMenu(); toggleDropdown(); }}
              >
                Change Password
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
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/changePassword" element={<ChangePassword/>} />
      </Routes>
    </div>
  );
};

export default NavBar;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './Router/AuthProvider';
import Login from './components/Login';
import AdminPrivateRouter from './Router/AdminPrivateRouter';
import CustPrivateRouter from './Router/CustPrivateRouter';
import Admin from './components/admincomponents/Admin';
import Home from './components/userComponents/Home';
import Profile from './components/Profile';
import Cart from './components/userComponents/Cart';
import Orders from './components/userComponents/Orders';
import Admindashboard from './components/admincomponents/Admindashboard';
import OrderList from './components/admincomponents/OrderList';
import AddProduct from './components/admincomponents/AddProduct';
import EditProduct from './components/admincomponents/EditProduct';
import User from './components/userComponents/User';
import Signup from './components/Signup';
import Footer from './Footer';
import Checkout from './components/userComponents/Checkout';
import Customers from './components/admincomponents/Customers';
import 'bootstrap/dist/css/bootstrap.min.css';
import ChangePassword from './components/userComponents/ChangePassword';
import ForgotPassword from './components/ForgotPassword';

function App() {

    return (
        <div className="flex flex-col min-h-screen">
            <Router>
                <AuthProvider>
                    <div className="flex-grow">
                        <Routes>
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/forgotPassword" element={<ForgotPassword/>} />
                            <Route element={<AdminPrivateRouter />}>
                                <Route path="/admin/*" element={<Admin />}>
                                    <Route path="dashboard" element={<Admindashboard />} />
                                    <Route path="addProduct" element={<AddProduct />} />
                                    <Route path="orders" element={<OrderList />} />
                                    <Route path="editProduct" element={<EditProduct />} />
                                    <Route path="customers" element={<Customers />} />
                                </Route>
                            </Route>
                            <Route element={<CustPrivateRouter />}>
                                <Route path="/*" element={<User />}>
                                    <Route path="home" element={<Home />} />
                                    <Route path="profile" element={<Profile />} />
                                    <Route path="cart" element={<Cart />} />
                                    <Route path="orders" element={<Orders />} />
                                    <Route path="checkout" element={<Checkout />} />
                                    <Route path="changePassword" element={<ChangePassword />} />
                                </Route>
                            </Route>
                        </Routes>
                    </div>
                </AuthProvider>
            </Router>
            <Footer />
        </div>
    );
}

export default App;

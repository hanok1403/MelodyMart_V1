import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AuthProvider from "./Router/AuthProvider";
import { useAuth } from "./Router/AuthProvider";
import Login from "./components/Login";
import AdminPrivateRouter from './Router/AdminPrivateRouter';
import CustPrivateRouter from './Router/CustPrivateRouter';
import Admin from "./components/Admin";
import Home from "./components/userComponents/Home";

const AppRoutes = () => {
    const navigate = useNavigate();
    const { logoutAction } = useAuth();

    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<AdminPrivateRouter />}>
                <Route path="/admin" element={<Admin />} />
            </Route>
            <Route element={<CustPrivateRouter />}>
                <Route path="/" element={<Home />} />
            </Route>
            {/* Example of how to use logout */}
            {/* <button onClick={() => logoutAction(navigate)}>Logout</button> */}
        </Routes>
    );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;

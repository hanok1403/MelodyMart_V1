import React from "react";
import { Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";
import './App.css';
import AdminPrivateRouter from './Router/AdminPrivateRouter';
import AuthProvider, { useAuth } from "./Router/AuthProvider";
import CustPrivateRouter from './Router/CustPrivateRouter';
import Login from "./components/Login";
import Admin from "./components/admincomponents/Admin";
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

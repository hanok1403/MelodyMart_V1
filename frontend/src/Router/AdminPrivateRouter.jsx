import React from 'react';
import { useAuth } from "./AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRouter = () => {
    const { token, role } = useAuth();

    if (!token) return <Navigate to="/login" />;
    if (role !== 'admin') return <h3>Invalid Access</h3>;

    return <Outlet />;
};

export default AdminPrivateRouter;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const AdminPrivateRouter = () => {
    const { token, role } = useAuth();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (role !== 'admin') {
        alert("Invalid access");
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default AdminPrivateRouter;

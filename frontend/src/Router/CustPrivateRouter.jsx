import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const CustPrivateRouter = () => {
    const { token, role } = useAuth();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (role !== 'user') {
        alert("Invalid access");
        return <Navigate to="/login" />;
    }

    return <Outlet />;
};

export default CustPrivateRouter;

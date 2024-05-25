import { useAuth } from './AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';

const AdminPrivateRouter = () => {
    const { token, role } = useAuth();
    console.log(token)
    console.log(role)
    if (!token) {
        return <Navigate to="/login" />;
    }

    if (role !== 'admin') {
        return <Navigate to="/login" />;
    }
    
    return <Outlet />;
};

export default AdminPrivateRouter;

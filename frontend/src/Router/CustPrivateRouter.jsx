import { useAuth } from './AuthProvider';
import { Navigate, Outlet } from 'react-router-dom';

const CustPrivateRouter = () => {
    const { token, role } = useAuth();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (role !== 'user') {
        return <Navigate to="/login" />;
    
    }

    return <Outlet />;
};

export default CustPrivateRouter;

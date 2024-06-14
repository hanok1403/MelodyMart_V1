import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');

        if (storedUser && storedToken && storedRole) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
            setRole(storedRole);
        }
        if (storedRole === 'admin') {
            navigate('/admin/dashboard');
        } else if (storedRole === 'user') {
            navigate('/home');
        } else {
            logoutAction();
        }
    }, []);

    const loginAction = async (credentials) => {
        const data = credentials;
        setUser(data.user);
        setToken(data.token);
        setRole(data.role);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);

        if (data.role === 'admin') {
            navigate('/admin/dashboard');
        } else if (data.role === 'user') {
            navigate('/home');
        } else {
            logoutAction();
        }
    };

    const logoutAction = () => {
        setUser(null);
        setToken(null);
        setRole(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, role, loginAction, logoutAction }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};

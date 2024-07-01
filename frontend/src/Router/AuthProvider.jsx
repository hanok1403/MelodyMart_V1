import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState('');
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');
        const storedUserId = localStorage.getItem('userId');


        if (storedUser && storedToken && storedRole && storedUserId) {
            setUser(JSON.parse(storedUser));
            setToken(storedToken);
            setRole(storedRole);
            setUserId(storedUserId);
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
        setUserId(data.userId);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);
        localStorage.setItem('userId', data.userId);

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
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, token, role, userId, loginAction, logoutAction }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};

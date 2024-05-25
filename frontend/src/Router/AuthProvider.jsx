import React, { createContext, useState, useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const loginAction = async (credentials) => {
    
            const data = credentials
            setUser(data.user);
            setToken(data.token);
            setRole(data.role);
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);

            if (data.role === 'admin') {
                console.log("logging as admin");
                navigate('/admin');
                
            } else if(data.role === 'user'){
                console.log("logging as user");
                navigate('/');
                
            }
            else{
                console.log("cannot log");
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
        navigate('/login')
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

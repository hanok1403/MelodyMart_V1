import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [role, setRole] = useState('');

    const loginAction = async (data) => {
        try {
            const response = await axios.get('');
            if (response.data) {
                setUser(response.data.user);
                setToken(response.data.token);
                setRole(response.data.role);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('role', response.data.role);
                return;
            }
            throw new Error('Login error');
        } catch (err) {
            console.log(err);
        }
    };

    const logoutAction = (navigate) => {
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

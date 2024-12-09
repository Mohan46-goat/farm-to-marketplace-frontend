import React, { createContext, useContext, useState } from 'react'
import { loginUserAPI } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
});

    const login = async (email, password, role) => {
        try {
            const userData = await loginUserAPI(email, password); // Authenticate user
            const userWithRole = { ...userData, role };  // Attach the selected role
            setUser(userWithRole);
            localStorage.setItem('user', JSON.stringify(userWithRole)); // Persist user data
            return { success: true, user: userWithRole }; // Return success and user data
        } catch (error) {
            console.error("Login failed:", error.message);
            throw new Error(error.message || 'Invalid credentials'); // Throw error to be handled by component
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
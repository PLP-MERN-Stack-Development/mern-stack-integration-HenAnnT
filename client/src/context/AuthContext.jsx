import { createContext, useState } from 'react';
import { authService } from '../services/api';

// Create the AuthContext
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
    // Initialize user from localStorage (persisted by authService)
    const [user, setUser] = useState(authService.getCurrentUser());

    // Optional: logout function
    const logout = () => {
        authService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

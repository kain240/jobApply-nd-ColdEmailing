import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Check for existing token on mount
    useEffect(() => {
        const token = localStorage.getItem('jobApplyToken');
        const user = localStorage.getItem('jobApplyUser');

        if (token && user) {
            setCurrentUser(JSON.parse(user));
            setIsAuthenticated(true);
        }

        setLoading(false);
    }, []);

    // Login function
    const login = async (email, password) => {
        try {
            // Replace with actual API call when backend is ready
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            // For development, simulate a successful login
            if (!response.ok) {
                // Mock response for development
                if (email === 'test@example.com' && password === 'password') {
                    const userData = {
                        id: '1',
                        name: 'Test User',
                        email: 'test@example.com',
                        role: 'user',
                    };

                    const mockToken = 'mock-jwt-token';

                    localStorage.setItem('jobApplyToken', mockToken);
                    localStorage.setItem('jobApplyUser', JSON.stringify(userData));

                    setCurrentUser(userData);
                    setIsAuthenticated(true);
                    return { success: true, user: userData };
                } else {
                    throw new Error('Invalid credentials');
                }
            }

            const data = await response.json();

            localStorage.setItem('jobApplyToken', data.token);
            localStorage.setItem('jobApplyUser', JSON.stringify(data.user));

            setCurrentUser(data.user);
            setIsAuthenticated(true);

            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Register function
    const register = async (name, email, password) => {
        try {
            // Replace with actual API call when backend is ready
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                // Mock response for development
                const userData = {
                    id: '1',
                    name,
                    email,
                    role: 'user',
                };

                const mockToken = 'mock-jwt-token';

                localStorage.setItem('jobApplyToken', mockToken);
                localStorage.setItem('jobApplyUser', JSON.stringify(userData));

                setCurrentUser(userData);
                setIsAuthenticated(true);
                return { success: true, user: userData };
            }

            const data = await response.json();

            localStorage.setItem('jobApplyToken', data.token);
            localStorage.setItem('jobApplyUser', JSON.stringify(data.user));

            setCurrentUser(data.user);
            setIsAuthenticated(true);

            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('jobApplyToken');
        localStorage.removeItem('jobApplyUser');
        setCurrentUser(null);
        setIsAuthenticated(false);
    };

    // Update user profile
    const updateProfile = async (userData) => {
        try {
            // Replace with actual API call when backend is ready
            const token = localStorage.getItem('jobApplyToken');

            const response = await fetch('/api/users/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                // Mock response for development
                const updatedUser = { ...currentUser, ...userData };
                localStorage.setItem('jobApplyUser', JSON.stringify(updatedUser));
                setCurrentUser(updatedUser);
                return { success: true, user: updatedUser };
            }

            const data = await response.json();

            localStorage.setItem('jobApplyUser', JSON.stringify(data.user));
            setCurrentUser(data.user);

            return { success: true, user: data.user };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const value = {
        currentUser,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
        updateProfile,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
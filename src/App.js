import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import JobApplications from './pages/JobApplications';
import AddApplication from './pages/AddApplication';
import EditApplication from './pages/EditApplication';
import ColdEmails from './pages/ColdEmails';
import EmailTemplates from './pages/EmailTemplates';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    // Check if user is authenticated
    useEffect(() => {
        const checkAuth = async () => {
            // For development purposes, we'll simulate authentication
            // In production, you would check with your backend API
            const token = localStorage.getItem('token');
            if (token) {
                // Simulate fetching user data
                setUser({
                    id: 1,
                    name: 'John Doe',
                    email: 'john@example.com',
                    avatar: '/avatar.png'
                });
                setIsAuthenticated(true);
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = (userData, token) => {
        localStorage.setItem('token', token);
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <Router>
            <div className="app">
                {isAuthenticated ? (
                    <>
                        <Navbar user={user} onLogout={logout} />
                        <div className="main-container">
                            <Sidebar />
                            <main className="content">
                                <Routes>
                                    <Route path="/" element={<Dashboard user={user} />} />
                                    <Route path="/applications" element={<JobApplications />} />
                                    <Route path="/applications/add" element={<AddApplication />} />
                                    <Route path="/applications/edit/:id" element={<EditApplication />} />
                                    <Route path="/cold-emails" element={<ColdEmails />} />
                                    <Route path="/email-templates" element={<EmailTemplates />} />
                                    <Route path="/analytics" element={<Analytics />} />
                                    <Route path="/settings" element={<Settings user={user} />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                            </main>
                        </div>
                    </>
                ) : (
                    <Routes>
                        <Route path="/login" element={<Login onLogin={login} />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="*" element={<Navigate to="/login" replace />} />
                    </Routes>
                )}
            </div>
        </Router>
    );
}

export default App;
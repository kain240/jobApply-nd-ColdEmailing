import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import JobListing from './pages/JobListing';
import ColdEmailing from './pages/ColdEmailing';
import Navbar from './components/Navbar';
import './App.css';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Protected route component to handle authentication
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app">
                    <Navbar />
                    <div className="content">
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/dashboard" element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } />
                            <Route path="/jobs" element={
                                <ProtectedRoute>
                                    <JobListing />
                                </ProtectedRoute>
                            } />
                            <Route path="/cold-email" element={
                                <ProtectedRoute>
                                    <ColdEmailing />
                                </ProtectedRoute>
                            } />
                            <Route path="/" element={<Navigate to="/login" />} />
                        </Routes>
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import JobSearch from './pages/JobSearch';
import JobDetails from './pages/JobDetails';
import SavedJobs from './pages/SavedJobs';
import ApplicationTracker from './pages/ApplicationTracker';
import ColdEmailGenerator from './pages/ColdEmailGenerator';
import ColdEmailTemplates from './pages/ColdEmailTemplates';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="app-container">
                    <Navbar />
                    <main className="main-content">
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />

                            {/* Protected Routes */}
                            <Route path="/dashboard" element={
                                <ProtectedRoute>
                                    <Dashboard />
                                </ProtectedRoute>
                            } />
                            <Route path="/job-search" element={
                                <ProtectedRoute>
                                    <JobSearch />
                                </ProtectedRoute>
                            } />
                            <Route path="/job/:id" element={
                                <ProtectedRoute>
                                    <JobDetails />
                                </ProtectedRoute>
                            } />
                            <Route path="/saved-jobs" element={
                                <ProtectedRoute>
                                    <SavedJobs />
                                </ProtectedRoute>
                            } />
                            <Route path="/applications" element={
                                <ProtectedRoute>
                                    <ApplicationTracker />
                                </ProtectedRoute>
                            } />
                            <Route path="/cold-email" element={
                                <ProtectedRoute>
                                    <ColdEmailGenerator />
                                </ProtectedRoute>
                            } />
                            <Route path="/email-templates" element={
                                <ProtectedRoute>
                                    <ColdEmailTemplates />
                                </ProtectedRoute>
                            } />
                            <Route path="/profile" element={
                                <ProtectedRoute>
                                    <Profile />
                                </ProtectedRoute>
                            } />

                            {/* 404 Route */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
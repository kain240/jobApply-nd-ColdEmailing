import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Layout Components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Sidebar from './components/Layout/Sidebar';

// Auth Components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ProtectedRoute from './components/Auth/ProtectedRoute';

// Pages
import Dashboard from './pages/Dashboard';
import AddApplication from './pages/AddApplication';
import EditApplication from './pages/EditApplication';
import ColdEmailing from './pages/ColdEmailing';
import GeneratedEmail from './pages/GeneratedEmail';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <div className="main-content">
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        {/* Protected Routes */}
                        <Route path="/" element={
                            <ProtectedRoute>
                                <div className="dashboard-layout">
                                    <Sidebar />
                                    <Dashboard />
                                </div>
                            </ProtectedRoute>
                        } />

                        <Route path="/dashboard" element={
                            <ProtectedRoute>
                                <div className="dashboard-layout">
                                    <Sidebar />
                                    <Dashboard />
                                </div>
                            </ProtectedRoute>
                        } />

                        <Route path="/add-application" element={
                            <ProtectedRoute>
                                <div className="dashboard-layout">
                                    <Sidebar />
                                    <AddApplication />
                                </div>
                            </ProtectedRoute>
                        } />

                        <Route path="/edit-application/:id" element={
                            <ProtectedRoute>
                                <div className="dashboard-layout">
                                    <Sidebar />
                                    <EditApplication />
                                </div>
                            </ProtectedRoute>
                        } />

                        <Route path="/cold-emailing" element={
                            <ProtectedRoute>
                                <div className="dashboard-layout">
                                    <Sidebar />
                                    <ColdEmailing />
                                </div>
                            </ProtectedRoute>
                        } />

                        <Route path="/generated-email/:id" element={
                            <ProtectedRoute>
                                <div className="dashboard-layout">
                                    <Sidebar />
                                    <GeneratedEmail />
                                </div>
                            </ProtectedRoute>
                        } />

                        {/* Redirect unknown routes to Dashboard */}
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
//import '../styles/Navbar.css';

function Navbar() {
    const { currentUser, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Don't show navbar on login and signup pages
    if (location.pathname === '/login' || location.pathname === '/signup') {
        return null;
    }

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/dashboard">
                    <h1>Auto Job Apply</h1>
                </Link>
            </div>

            <div className="navbar-links">
                {isAuthenticated ? (
                    <>
                        <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''}>
                            Dashboard
                        </Link>
                        <Link to="/jobs" className={location.pathname === '/jobs' ? 'active' : ''}>
                            Job Listings
                        </Link>
                        <Link to="/cold-email" className={location.pathname === '/cold-email' ? 'active' : ''}>
                            Cold Emailing
                        </Link>
                    </>
                ) : null}
            </div>

            <div className="navbar-user">
                {isAuthenticated ? (
                    <>
                        <div className="user-info">
                            <span className="user-greeting">Hi, {currentUser?.name?.split(' ')[0] || 'User'}</span>
                        </div>
                        <button className="logout-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="auth-buttons">
                        <Link to="/login" className="login-button">Login</Link>
                        <Link to="/signup" className="signup-button">Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
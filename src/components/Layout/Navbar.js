import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    // For now we'll use a mock authentication state
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        // Logic for logout would go here, connecting to backend
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    JobApply
                </Link>

                <div className="menu-icon" onClick={toggleMenu}>
                    <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
                </div>

                <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            Home
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/job-search" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            Find Jobs
                        </Link>
                    </li>

                    {isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/saved-jobs" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    Saved Jobs
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/application-tracker" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    Application Tracker
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/cold-email-generator" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    Cold Email Tool
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    Profile
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button className="logout-btn" onClick={handleLogout}>
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    Login
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/register" className="nav-link signup-btn" onClick={() => setIsMenuOpen(false)}>
                                    Sign Up
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Layout.css';

const Navbar = ({ isAuthenticated, logout }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    JobApply<span className="highlight">Pro</span>
                </Link>

                <div className="menu-icon" onClick={toggleMenu}>
                    <i className={isMenuOpen ? "fas fa-times" : "fas fa-bars"}></i>
                </div>

                <ul className={isMenuOpen ? "nav-menu active" : "nav-menu"}>
                    {isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <Link to="/dashboard" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    Dashboard
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/jobs" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    Job Applications
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/emails" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    Cold Emails
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/emails/templates" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    Email Templates
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button onClick={handleLogout} className="nav-link logout-btn">
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
                                <Link to="/register" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                                    Register
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

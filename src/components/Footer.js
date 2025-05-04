import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h3 className="footer-heading">JobApply<span className="footer-highlight">&</span>Connect</h3>
                    <p className="footer-description">
                        Streamline your job search, application process, and professional networking with our all-in-one platform.
                    </p>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Quick Links</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/job-search">Job Search</Link></li>
                        <li><Link to="/cold-email">Email Generator</Link></li>
                        <li><Link to="/email-templates">Email Templates</Link></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Resources</h4>
                    <ul className="footer-links">
                        <li><a href="#">Career Blog</a></li>
                        <li><a href="#">Resume Tips</a></li>
                        <li><a href="#">Interview Preparation</a></li>
                        <li><a href="#">Networking Guide</a></li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h4 className="footer-title">Contact</h4>
                    <ul className="footer-contact">
                        <li><i className="fas fa-envelope"></i> support@jobapplyconnect.com</li>
                        <li><i className="fas fa-phone"></i> (555) 123-4567</li>
                    </ul>
                    <div className="social-icons">
                        <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
                        <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="social-icon"><i className="fab fa-facebook"></i></a>
                        <a href="#" className="social-icon"><i className="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} JobApply&Connect. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
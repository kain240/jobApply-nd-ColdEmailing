import React from 'react';
import './Layout.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>JobApply<span className="highlight">Pro</span></h3>
                    <p>Streamline your job application process and cold emailing campaigns.</p>
                </div>
                <div className="footer-section">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><a href="/dashboard">Dashboard</a></li>
                        <li><a href="/jobs">Job Applications</a></li>
                        <li><a href="/emails">Cold Emails</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h3>Connect With Us</h3>
                    <div className="social-links">
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-linkedin"></i></a>
                        <a href="#"><i className="fab fa-github"></i></a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} JobApplyPro. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;

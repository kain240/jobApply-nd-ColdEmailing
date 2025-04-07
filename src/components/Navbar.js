import React from "react";
import { Link } from "react-router-dom";
import "../styles/global.css"; // Ensure styles are linked

function Navbar() {
    return (
        <nav className="navbar">
            <div className="container">
                <h1 className="logo">Job Apply Platform</h1>
                <ul className="nav-links">
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/job-listings">Job Listings</Link></li> {/* New Link */}
                    <li><Link to="/cold-emailing">Cold Emailing</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to="/signup">Signup</Link></li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;

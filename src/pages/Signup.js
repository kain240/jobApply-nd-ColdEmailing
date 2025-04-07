import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import "../styles/Auth.css";

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setError("");

        // Simulate form submission
        const userData = { name, email, password };
        console.log("User signed up:", userData);

        navigate("/dashboard");
    };

    const handleGoogleSignup = () => {
        // Temporary simulation
        console.log("Signing up with Google...");
        navigate("/dashboard");
    };

    const handleLinkedInSignup = () => {
        // Temporary simulation
        console.log("Signing up with LinkedIn...");
        navigate("/dashboard");
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-form">
                    <h2>Create an Account ✨</h2>
                    <p>Join us and shape your journey.<br />Fill in the details to get started.</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Create Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="error-text">{error}</p>}
                        <button type="submit">Sign up</button>
                        <div className="or">Or</div>
                        <div className="social-buttons">
                            <button type="button" onClick={handleGoogleSignup}>
                                🔵 Sign up with Google
                            </button>
                            <button type="button" onClick={handleLinkedInSignup}>
                                🔗 Sign up with LinkedIn
                            </button>
                        </div>
                        <p style={{ fontSize: "12px", marginTop: "20px" }}>
                            Already have an account? <a href="/login">Login</a>
                        </p>
                    </form>
                </div>
                <div className="auth-image"></div>
            </div>
        </div>
    );
}

export default Signup;

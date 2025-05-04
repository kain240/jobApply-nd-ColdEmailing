import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/global.css";
import "../styles/Auth.css";

function Signup() {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Form validation
        if (!email.includes("@")) {
            setError("Please enter a valid email address.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const res = await axios.post("http://localhost:5000/api/signup", {
                name,
                email,
                password,
            });

            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
            } else {
                setError(res.data.message || "Signup failed. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setError("Server error. Please try again later.");
        }

        setLoading(false);
    };

    const handleGoogleSignup = () => {
        console.log("Signing up with Google...");
        // Temporary simulation
        navigate("/dashboard"); // Replace with actual OAuth flow
    };

    const handleLinkedInSignup = () => {
        console.log("Signing up with LinkedIn...");
        // Temporary simulation
        navigate("/dashboard"); // Replace with actual OAuth flow
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-form">
                    <h2>Create an Account ✨</h2>
                    <p>
                        Join us and shape your journey.<br />
                        Fill in the details to get started.
                    </p>
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
                        <button type="submit" disabled={loading}>
                            {loading ? "Signing up..." : "Sign up"}
                        </button>
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

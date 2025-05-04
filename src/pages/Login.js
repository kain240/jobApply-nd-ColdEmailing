import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/global.css";
import "../styles/Auth.css";

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            const res = await axios.post("http://localhost:5000/api/login", {
                email,
                password,
            });

            if (res.data.success) {
                localStorage.setItem("token", res.data.token);
                navigate("/dashboard");
            } else {
                setError(res.data.message || "Invalid credentials.");
            }
        } catch (err) {
            console.error(err);
            setError("Server error. Please try again later.");
        }

        setLoading(false);
    };

    const handleGoogleSignin = () => {
        console.log("Signing in with Google...");
        navigate("/dashboard"); // Replace with actual OAuth flow
    };

    const handleLinkedInSignin = () => {
        console.log("Signing in with LinkedIn...");
        navigate("/dashboard"); // Replace with actual OAuth flow
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <div className="auth-form">
                    <h2>Welcome Back 👋</h2>
                    <p>
                        Ready to take the next step in your career?<br />
                        Sign in to explore job opportunities and manage your applications.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Example@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="At least 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        {error && <p className="error-text">{error}</p>}
                        <div className="forgot">
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                        <div className="or">Or</div>
                        <div className="social-buttons">
                            <button type="button" onClick={handleGoogleSignin}>
                                🔵 Sign up with Google
                            </button>
                            <button type="button" onClick={handleLinkedInSignin}>
                                🔗 Sign up with LinkedIn
                            </button>
                        </div>
                        <p style={{ fontSize: "12px", marginTop: "20px" }}>
                            Don’t have an account? <a href="/signup">Sign up</a>
                        </p>
                    </form>
                </div>
                <div className="auth-image"></div>
            </div>
        </div>
    );
}

export default Login;

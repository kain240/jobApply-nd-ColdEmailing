import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!email || !password) {
            return setError('Please enter both email and password');
        }

        try {
            setError('');
            setLoading(true);

            const result = await login(email, password);

            if (!result.success) {
                throw new Error(result.error || 'Failed to log in');
            }

            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Welcome Back</h2>
                <p className="login-subtitle">Sign in to your account</p>

                {error && <div className="alert-error">{error}</div>}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="form-group remember-forgot">
                        <div className="remember-me">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember">Remember me</label>
                        </div>
                        <Link to="/forgot-password" className="forgot-password">Forgot password?</Link>
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                        disabled={loading}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="login-divider">
                    <span>OR</span>
                </div>

                <div className="social-login">
                    <button className="google-button">
                        <i className="fab fa-google"></i> Sign in with Google
                    </button>
                    <button className="linkedin-button">
                        <i className="fab fa-linkedin"></i> Sign in with LinkedIn
                    </button>
                </div>

                <p className="register-link">
                    Don't have an account? <Link to="/register">Register now</Link>
                </p>
            </div>

            <div className="login-info-card">
                <h3>Test Account</h3>
                <p>For testing purposes, you can use:</p>
                <p><strong>Email:</strong> test@example.com</p>
                <p><strong>Password:</strong> password</p>
            </div>
        </div>
    );
};

export default Login;
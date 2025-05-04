import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Login = ({ login }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { email, password } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // This is where you'll integrate with the backend
            // For now, we'll simulate a successful login
            setTimeout(() => {
                // Replace with actual API call when backend is ready
                // const response = await axios.post('/api/auth/login', formData);
                login('dummy-token');
                setIsLoading(false);
            }, 1000);
        } catch (err) {
            setError('Invalid credentials. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Log In to Your Account</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="auth-redirect">
                    Don't have an account? <Link to="/register">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

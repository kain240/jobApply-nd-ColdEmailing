import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Register = ({ login }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { name, email, password, confirmPassword } = formData;

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async e => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            // This is where you'll integrate with the backend
            // For now, we'll simulate a successful registration
            setTimeout(() => {
                // Replace with actual API call when backend is ready
                // const response = await axios.post('/api/auth/register', formData);
                login('dummy-token');
                setIsLoading(false);
            }, 1000);
        } catch (err) {
            setError('Registration failed. Please try again.');
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Create a New Account</h2>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={name}
                            onChange={onChange}
                            required
                        />
                    </div>
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
                            minLength="6"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onChange}
                            required
                            minLength="6"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={isLoading}>
                        {isLoading ? 'Creating Account...' : 'Register'}
                    </button>
                </form>
                <p className="auth-redirect">
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
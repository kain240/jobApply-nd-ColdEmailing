import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="hero-content">
                    <h1>Find Your Dream Job & Connect With Employers</h1>
                    <p>
                        Job search, application tracking, and cold email outreach - all in one platform.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/job-search" className="btn btn-primary">
                            Find Jobs
                        </Link>
                        <Link to="/register" className="btn btn-secondary">
                            Create Account
                        </Link>
                    </div>
                </div>
            </section>

            <section className="features-section">
                <h2>Why Use JobApply?</h2>
                <div className="features-grid">
                    <div className="feature-card">
                        <i className="fas fa-search feature-icon"></i>
                        <h3>Job Search</h3>
                        <p>Find relevant job listings tailored to your skills and experience.</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-tasks feature-icon"></i>
                        <h3>Application Tracker</h3>
                        <p>Keep track of all your job applications in one organized place.</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-envelope feature-icon"></i>
                        <h3>Cold Email Generator</h3>
                        <p>Create personalized cold emails to reach out to potential employers.</p>
                    </div>
                    <div className="feature-card">
                        <i className="fas fa-file-alt feature-icon"></i>
                        <h3>Email Templates</h3>
                        <p>Access professionally crafted templates for your job search needs.</p>
                    </div>
                </div>
            </section>

            <section className="how-it-works-section">
                <h2>How It Works</h2>
                <div className="steps-container">
                    <div className="step">
                        <div className="step-number">1</div>
                        <h3>Create an Account</h3>
                        <p>Sign up and set up your profile with your skills and preferences.</p>
                    </div>
                    <div className="step">
                        <div className="step-number">2</div>
                        <h3>Find Relevant Jobs</h3>
                        <p>Search for jobs that match your skills and career goals.</p>
                    </div>
                    <div className="step">
                        <div className="step-number">3</div>
                        <h3>Track Applications</h3>
                        <p>Keep all your job applications organized in one place.</p>
                    </div>
                    <div className="step">
                        <div className="step-number">4</div>
                        <h3>Connect With Employers</h3>
                        <p>Use our cold email tools to reach out to potential employers.</p>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <h2>Ready to Take Your Job Search to the Next Level?</h2>
                <p>Join thousands of job seekers who found their dream jobs with JobApply.</p>
                <Link to="/register" className="btn btn-primary btn-large">
                    Get Started Now
                </Link>
            </section>
        </div>
    );
};

export default Home;
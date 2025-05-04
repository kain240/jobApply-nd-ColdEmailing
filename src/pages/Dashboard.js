import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobsApi, emailsApi } from '../api/apiService';
import JobList from '../components/JobList';
import StatCard from '../components/StatCard';
import EmailStats from '../components/EmailStats';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalApplications: 0,
        activeApplications: 0,
        interviews: 0,
        offers: 0
    });
    const [emailStats, setEmailStats] = useState({
        totalEmails: 0,
        sentEmails: 0,
        responseRate: 0
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                // Fetch jobs data
                const jobsData = await jobsApi.getAllJobs();

                // Calculate job application stats
                const totalApplications = jobsData.length;
                const activeApplications = jobsData.filter(job =>
                    !['Rejected', 'Withdrawn', 'Offer'].includes(job.applicationStatus)
                ).length;
                const interviews = jobsData.filter(job =>
                    ['Interview', 'Technical'].includes(job.applicationStatus)
                ).length;
                const offers = jobsData.filter(job =>
                    job.applicationStatus === 'Offer'
                ).length;

                setStats({
                    totalApplications,
                    activeApplications,
                    interviews,
                    offers
                });

                // Fetch email stats
                const emailStatsData = await emailsApi.getStats();
                setEmailStats(emailStatsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="loading">Loading dashboard data...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Job Application Dashboard</h1>
                <div className="dashboard-actions">
                    <Link to="/add-application" className="add-job-button">
                        + Add New Application
                    </Link>
                    <Link to="/cold-emailing" className="create-email-button">
                        Create Cold Email
                    </Link>
                </div>
            </div>

            <div className="stats-container">
                <StatCard
                    title="Total Applications"
                    value={stats.totalApplications}
                    icon="applications"
                    color="blue"
                />
                <StatCard
                    title="Active Applications"
                    value={stats.activeApplications}
                    icon="active"
                    color="green"
                />
                <StatCard
                    title="Interview Stage"
                    value={stats.interviews}
                    icon="interview"
                    color="purple"
                />
                <StatCard
                    title="Offers"
                    value={stats.offers}
                    icon="offer"
                    color="orange"
                />
            </div>

            <div className="dashboard-content">
                <div className="jobs-container">
                    <h2>Recent Applications</h2>
                    <JobList limit={5} showViewAll={true} />
                </div>

                <div className="email-stats-container">
                    <h2>Email Statistics</h2>
                    <EmailStats stats={emailStats} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
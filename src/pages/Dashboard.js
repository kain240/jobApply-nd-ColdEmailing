import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../styles/Dashboard.css';

function Dashboard() {
    const { currentUser } = useAuth();
    const [stats, setStats] = useState({
        jobsApplied: 0,
        emailsSent: 0,
        responses: 0,
        interviews: 0
    });
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const token = localStorage.getItem('token');
                // Fetch statistics
                const statsResponse = await fetch('http://localhost:5000/api/dashboard/stats', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // Fetch recent activity
                const activityResponse = await fetch('http://localhost:5000/api/dashboard/activity', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (statsResponse.ok && activityResponse.ok) {
                    const statsData = await statsResponse.json();
                    const activityData = await activityResponse.json();

                    setStats(statsData);
                    setRecentActivity(activityData);
                } else {
                    console.error('Failed to fetch dashboard data');
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="loading">Loading dashboard data...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Welcome, {currentUser?.name || 'User'}</h1>
                <p>Here's your job search overview</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Jobs Applied</h3>
                    <p className="stat-number">{stats.jobsApplied}</p>
                </div>
                <div className="stat-card">
                    <h3>Cold Emails Sent</h3>
                    <p className="stat-number">{stats.emailsSent}</p>
                </div>
                <div className="stat-card">
                    <h3>Responses</h3>
                    <p className="stat-number">{stats.responses}</p>
                </div>
                <div className="stat-card">
                    <h3>Interviews</h3>
                    <p className="stat-number">{stats.interviews}</p>
                </div>
            </div>

            <div className="recent-activity">
                <h2>Recent Activity</h2>
                {recentActivity.length > 0 ? (
                    <div className="activity-list">
                        {recentActivity.map((activity, index) => (
                            <div key={index} className="activity-item">
                                <div className="activity-icon">{getActivityIcon(activity.type)}</div>
                                <div className="activity-details">
                                    <p className="activity-text">{activity.description}</p>
                                    <p className="activity-date">{new Date(activity.date).toLocaleDateString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-activity">No recent activity to display</p>
                )}
            </div>

            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                    <a href="/jobs" className="action-button">Find Jobs</a>
                    <a href="/cold-email" className="action-button">Send Cold Emails</a>
                </div>
            </div>
        </div>
    );
}

// Helper function to get an icon based on activity type
function getActivityIcon(type) {
    switch (type) {
        case 'application':
            return '📝';
        case 'email':
            return '📧';
        case 'response':
            return '📬';
        case 'interview':
            return '👥';
        default:
            return '🔔';
    }
}

export default Dashboard;

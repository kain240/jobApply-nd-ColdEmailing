import React from 'react';
import './Emails.css';

const EmailStats = ({ stats }) => {
    return (
        <div className="email-stats-wrapper">
            <div className="email-stats-chart">
                <div className="chart-bar">
                    <div
                        className="chart-fill"
                        style={{ width: `${Math.min(stats.responseRate, 100)}%` }}
                    >
                        {stats.responseRate}%
                    </div>
                </div>
                <div className="chart-label">Response Rate</div>
            </div>

            <div className="email-stats-grid">
                <div className="stat-item">
                    <span className="stat-value">{stats.totalEmails}</span>
                    <span className="stat-label">Total Emails</span>
                </div>

                <div className="stat-item">
                    <span className="stat-value">{stats.sentEmails}</span>
                    <span className="stat-label">Sent</span>
                </div>

                <div className="stat-item">
                    <span className="stat-value">{stats.openedEmails || 0}</span>
                    <span className="stat-label">Opened</span>
                </div>

                <div className="stat-item">
                    <span className="stat-value">{stats.responseEmails || 0}</span>
                    <span className="stat-label">Responses</span>
                </div>
            </div>

            <div className="email-activity">
                <h3>Recent Email Activity</h3>
                {stats.recentActivity && stats.recentActivity.length > 0 ? (
                    <ul className="activity-list">
                        {stats.recentActivity.map((activity, index) => (
                            <li key={index} className="activity-item">
                                <span className={`activity-type ${activity.type}`}>{activity.type}</span>
                                <span className="activity-target">{activity.target}</span>
                                <span className="activity-date">{new Date(activity.date).toLocaleDateString()}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="no-activity">No recent email activity</p>
                )}
            </div>
        </div>
    );
};

export default EmailStats;
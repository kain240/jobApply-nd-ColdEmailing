import React, { useState } from "react";
import "../styles/Dashboard.css";

function Dashboard() {
    const [activeTab, setActiveTab] = useState("listed");

    return (
        <div className="dashboard-container">
            <aside className="sidebar">
                <h2>JobTrackr</h2>
                <nav>
                    <ul>
                        <li className={activeTab === "listed" ? "active" : ""} onClick={() => setActiveTab("listed")}>Listed Jobs</li>
                        <li className={activeTab === "cold" ? "active" : ""} onClick={() => setActiveTab("cold")}>Cold Emails</li>
                        <li>Saved Jobs</li>
                        <li>Settings</li>
                        <li>Logout</li>
                    </ul>
                </nav>
            </aside>

            <main className="main-content">
                <header>
                    <h1>{activeTab === "listed" ? "Listed Job Applications" : "Cold Email Tracker"}</h1>
                </header>

                {activeTab === "listed" && (
                    <section className="content-section">
                        <div className="job-card">
                            <h3>Frontend Developer - Google</h3>
                            <p>Status: Under Review</p>
                            <p>Applied on: March 28, 2025</p>
                        </div>
                        <div className="job-card">
                            <h3>Full Stack Engineer - Amazon</h3>
                            <p>Status: Interview Scheduled</p>
                            <p>Applied on: March 24, 2025</p>
                        </div>
                    </section>
                )}

                {activeTab === "cold" && (
                    <section className="content-section">
                        <table className="cold-email-table">
                            <thead>
                            <tr>
                                <th>Company</th>
                                <th>Contact Email</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Netflix</td>
                                <td>hr@netflix.com</td>
                                <td>Backend Engineer</td>
                                <td>No Reply</td>
                                <td>April 1, 2025</td>
                            </tr>
                            <tr>
                                <td>Spotify</td>
                                <td>jobs@spotify.com</td>
                                <td>DevOps Engineer</td>
                                <td>Replied</td>
                                <td>March 30, 2025</td>
                            </tr>
                            </tbody>
                        </table>
                    </section>
                )}
            </main>
        </div>
    );
}

export default Dashboard;
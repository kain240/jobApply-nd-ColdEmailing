import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import api from "../api/api"; // Ensure this is correctly set up

function Dashboard() {
    const [activeTab, setActiveTab] = useState("listed");
    const [listedJobs, setListedJobs] = useState([]);
    const [coldEmails, setColdEmails] = useState([]);

    useEffect(() => {
        // Fetch data once backend is ready
        fetchListedJobs();
        fetchColdEmails();
    }, []);

    const fetchListedJobs = async () => {
        try {
            // const res = await api.get("/jobs/listed");
            // setListedJobs(res.data.jobs);

            // Placeholder data
            setListedJobs([
                {
                    title: "Frontend Developer - Google",
                    status: "Under Review",
                    date: "March 28, 2025",
                },
                {
                    title: "Full Stack Engineer - Amazon",
                    status: "Interview Scheduled",
                    date: "March 24, 2025",
                },
            ]);
        } catch (err) {
            console.error("Error fetching listed jobs:", err);
        }
    };

    const fetchColdEmails = async () => {
        try {
            // const res = await api.get("/emails/cold");
            // setColdEmails(res.data.emails);

            // Placeholder data
            setColdEmails([
                {
                    company: "Netflix",
                    email: "hr@netflix.com",
                    role: "Backend Engineer",
                    status: "No Reply",
                    date: "April 1, 2025",
                },
                {
                    company: "Spotify",
                    email: "jobs@spotify.com",
                    role: "DevOps Engineer",
                    status: "Replied",
                    date: "March 30, 2025",
                },
            ]);
        } catch (err) {
            console.error("Error fetching cold emails:", err);
        }
    };

    const logoutHandler = () => {
        // Clear session/auth here
        console.log("Logging out...");
    };

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
                        <li onClick={logoutHandler}>Logout</li>
                    </ul>
                </nav>
            </aside>

            <main className="main-content">
                <header>
                    <h1>{activeTab === "listed" ? "Listed Job Applications" : "Cold Email Tracker"}</h1>
                </header>

                <section className="content-section">
                    {activeTab === "listed" ? (
                        listedJobs.length > 0 ? (
                            listedJobs.map((job, index) => (
                                <div key={index} className="job-card">
                                    <h3>{job.title}</h3>
                                    <p>Status: {job.status}</p>
                                    <p>Applied on: {job.date}</p>
                                </div>
                            ))
                        ) : (
                            <p>No job applications found.</p>
                        )
                    ) : (
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
                            {coldEmails.length > 0 ? (
                                coldEmails.map((email, index) => (
                                    <tr key={index}>
                                        <td>{email.company}</td>
                                        <td>{email.email}</td>
                                        <td>{email.role}</td>
                                        <td>{email.status}</td>
                                        <td>{email.date}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No cold emails tracked yet.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    )}
                </section>
            </main>
        </div>
    );
}

export default Dashboard;

import React, { useState } from "react";
import "../styles/JobListings.css";

const jobData = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Google",
        location: "Bangalore",
        type: "Internship",
        experience: "0-1 years",
        tech: ["React", "JavaScript"],
        applyLink: "https://careers.google.com",
    },
    {
        id: 2,
        title: "Backend Engineer",
        company: "Amazon",
        location: "Remote",
        type: "Full-Time",
        experience: "1-3 years",
        tech: ["Node.js", "MongoDB"],
        applyLink: "https://amazon.jobs",
    },
    {
        id: 3,
        title: "Data Analyst",
        company: "Flipkart",
        location: "Hyderabad",
        type: "Internship",
        experience: "0-1 years",
        tech: ["Python", "Excel"],
        applyLink: "https://flipkartcareers.com",
    },
];

const JobListings = () => {
    const [filters, setFilters] = useState({
        type: "",
        location: "",
        experience: "",
        tech: "",
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const filteredJobs = jobData.filter((job) => {
        return (
            (!filters.type || job.type === filters.type) &&
            (!filters.location || job.location.toLowerCase().includes(filters.location.toLowerCase())) &&
            (!filters.experience || job.experience === filters.experience) &&
            (!filters.tech || job.tech.some((t) => t.toLowerCase().includes(filters.tech.toLowerCase())))
        );
    });

    return (
        <div className="job-listings-container">
            <aside className="filters">
                <h3>Filters</h3>
                <div className="filter-group">
                    <label>Job Type</label>
                    <select name="type" onChange={handleFilterChange} value={filters.type}>
                        <option value="">All</option>
                        <option value="Internship">Internship</option>
                        <option value="Full-Time">Full-Time</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Location</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="e.g. Bangalore"
                        onChange={handleFilterChange}
                        value={filters.location}
                    />
                </div>

                <div className="filter-group">
                    <label>Experience</label>
                    <select name="experience" onChange={handleFilterChange} value={filters.experience}>
                        <option value="">All</option>
                        <option value="0-1 years">0-1 years</option>
                        <option value="1-3 years">1-3 years</option>
                    </select>
                </div>

                <div className="filter-group">
                    <label>Tech Stack</label>
                    <input
                        type="text"
                        name="tech"
                        placeholder="e.g. React"
                        onChange={handleFilterChange}
                        value={filters.tech}
                    />
                </div>
            </aside>

            <main className="job-results">
                <h2>Job Listings</h2>
                {filteredJobs.length === 0 ? (
                    <p>No jobs found with selected filters.</p>
                ) : (
                    filteredJobs.map((job) => (
                        <div key={job.id} className="job-card">
                            <h3>{job.title}</h3>
                            <p><strong>Company:</strong> {job.company}</p>
                            <p><strong>Location:</strong> {job.location}</p>
                            <p><strong>Type:</strong> {job.type}</p>
                            <p><strong>Experience:</strong> {job.experience}</p>
                            <p><strong>Stack:</strong> {job.tech.join(", ")}</p>
                            <a href={job.applyLink} target="_blank" rel="noopener noreferrer" className="apply-link">
                                Apply Now
                            </a>
                        </div>
                    ))
                )}
            </main>
        </div>
    );
};

export default JobListings;

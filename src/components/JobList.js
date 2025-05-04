import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jobsApi } from '../api/apiService';
import ApplicationCard from './ApplicationCard';
import '../components/Jobs.css';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const data = await jobsApi.getAllJobs();
            setJobs(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this application?')) {
            try {
                await jobsApi.deleteJob(id);
                setJobs(jobs.filter(job => job.id !== id));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Filter and search jobs
    const filteredJobs = jobs.filter(job => {
        const matchesFilter = filter === 'all' || job.applicationStatus === filter;
        const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.position.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    if (loading) {
        return <div className="loading">Loading job applications...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="job-list-container">
            <div className="job-list-header">
                <h2>Your Job Applications</h2>
                <Link to="/add-application" className="add-job-button">
                    + Add New Application
                </Link>
            </div>

            <div className="filters-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search companies or positions..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>

                <div className="status-filter">
                    <label htmlFor="status-filter">Filter by status:</label>
                    <select
                        id="status-filter"
                        value={filter}
                        onChange={handleFilterChange}
                        className="filter-dropdown"
                    >
                        <option value="all">All Applications</option>
                        <option value="Applied">Applied</option>
                        <option value="Screening">Screening</option>
                        <option value="Interview">Interview</option>
                        <option value="Technical">Technical Assessment</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Withdrawn">Withdrawn</option>
                    </select>
                </div>
            </div>

            {filteredJobs.length === 0 ? (
                <div className="no-jobs">
                    <p>No job applications found.</p>
                    {filter !== 'all' && (
                        <p>Try changing your filter or add a new application.</p>
                    )}
                </div>
            ) : (
                <div className="job-cards-grid">
                    {filteredJobs.map(job => (
                        <ApplicationCard
                            key={job.id}
                            job={job}
                            onDelete={() => handleDelete(job.id)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobList;
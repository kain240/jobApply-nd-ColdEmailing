import React, { useState, useEffect } from 'react';
import '../styles/JobListing.css';

function JobListing() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        searchTerm: '',
        location: '',
        jobType: '',
        experience: ''
    });
    const [selectedJob, setSelectedJob] = useState(null);
    const [applyStatus, setApplyStatus] = useState(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');

            let url = 'http://localhost:5000/api/jobs';

            // Add query parameters based on filters
            const queryParams = new URLSearchParams();
            if (filters.searchTerm) queryParams.append('search', filters.searchTerm);
            if (filters.location) queryParams.append('location', filters.location);
            if (filters.jobType) queryParams.append('type', filters.jobType);
            if (filters.experience) queryParams.append('experience', filters.experience);

            if (queryParams.toString()) {
                url += `?${queryParams.toString()}`;
            }

            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch jobs');
            }

            const data = await response.json();
            setJobs(data);
            setError(null);
        } catch (err) {
            console.error('Error fetching jobs:', err);
            setError('Failed to load jobs. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleApply = async (jobId) => {
        try {
            setApplyStatus({ status: 'loading', jobId });
            const token = localStorage.getItem('token');

            const response = await fetch(`http://localhost:5000/api/jobs/${jobId}/apply`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to apply for the job');
            }

            const data = await response.json();
            setApplyStatus({ status: 'success', jobId, message: data.message });

            // Update jobs list to reflect the applied status
            setJobs(jobs.map(job =>
                job.id === jobId ? { ...job, applied: true } : job
            ));

            setTimeout(() => {
                setApplyStatus(null);
            }, 3000);

        } catch (err) {
            console.error('Error applying for job:', err);
            setApplyStatus({
                status: 'error',
                jobId,
                message: 'Failed to apply for this job. Please try again.'
            });

            setTimeout(() => {
                setApplyStatus(null);
            }, 3000);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobs();
    };

    const viewJobDetails = (job) => {
        setSelectedJob(job);
    };

    const closeJobDetails = () => {
        setSelectedJob(null);
    };

    return (
        <div className="job-listing-container">
            <div className="job-search-section">
                <h1>Find Your Next Opportunity</h1>

                <form className="job-search-form" onSubmit={handleSearch}>
                    <div className="search-inputs">
                        <div className="search-field">
                            <input
                                type="text"
                                name="searchTerm"
                                placeholder="Job title, skills, or keywords"
                                value={filters.searchTerm}
                                onChange={handleFilterChange}
                            />
                        </div>

                        <div className="search-field">
                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                value={filters.location}
                                onChange={handleFilterChange}
                            />
                        </div>

                        <div className="search-field">
                            <select
                                name="jobType"
                                value={filters.jobType}
                                onChange={handleFilterChange}
                            >
                                <option value="">Job Type</option>
                                <option value="full-time">Full-time</option>
                                <option value="part-time">Part-time</option>
                                <option value="contract">Contract</option>
                                <option value="internship">Internship</option>
                            </select>
                        </div>

                        <div className="search-field">
                            <select
                                name="experience"
                                value={filters.experience}
                                onChange={handleFilterChange}
                            >
                                <option value="">Experience Level</option>
                                <option value="entry">Entry Level</option>
                                <option value="mid">Mid Level</option>
                                <option value="senior">Senior Level</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="search-button">Search Jobs</button>
                </form>
            </div>

            {loading ? (
                <div className="loading">Loading jobs...</div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <div className="job-results">
                    <h2>Available Jobs ({jobs.length})</h2>

                    {jobs.length === 0 ? (
                        <div className="no-jobs">No jobs match your search criteria.</div>
                    ) : (
                        <div className="job-cards">
                            {jobs.map(job => (
                                <div key={job.id} className="job-card">
                                    <div className="job-header">
                                        <h3>{job.title}</h3>
                                        <div className="company-info">
                                            {job.company} • {job.location}
                                        </div>
                                    </div>

                                    <div className="job-tags">
                                        <span className="job-type">{job.type}</span>
                                        <span className="job-experience">{job.experience}</span>
                                        <span className="job-salary">${job.salary}</span>
                                    </div>

                                    <p className="job-description">{job.description.substring(0, 150)}...</p>

                                    <div className="job-actions">
                                        <button
                                            className="view-details-btn"
                                            onClick={() => viewJobDetails(job)}
                                        >
                                            View Details
                                        </button>

                                        <button
                                            className={`apply-btn ${job.applied ? 'applied' : ''}`}
                                            onClick={() => handleApply(job.id)}
                                            disabled={job.applied || (applyStatus && applyStatus.jobId === job.id && applyStatus.status === 'loading')}
                                        >
                                            {job.applied ? 'Applied' :
                                                (applyStatus && applyStatus.jobId === job.id) ?
                                                    (applyStatus.status === 'loading' ? 'Applying...' :
                                                        applyStatus.status === 'success' ? 'Applied!' : 'Try Again')
                                                    : 'Apply Now'}
                                        </button>
                                    </div>

                                    {applyStatus && applyStatus.jobId === job.id && applyStatus.message && (
                                        <div className={`apply-message ${applyStatus.status}`}>
                                            {applyStatus.message}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {selectedJob && (
                <div className="job-detail-modal">
                    <div className="modal-content">
                        <span className="close-modal" onClick={closeJobDetails}>&times;</span>

                        <div className="job-detail-header">
                            <h2>{selectedJob.title}</h2>
                            <div className="company-detail">
                                <strong>{selectedJob.company}</strong> • {selectedJob.location}
                            </div>
                        </div>

                        <div className="job-meta">
                            <div className="meta-item">
                                <strong>Type:</strong> {selectedJob.type}
                            </div>
                            <div className="meta-item">
                                <strong>Experience:</strong> {selectedJob.experience}
                            </div>
                            <div className="meta-item">
                                <strong>Salary:</strong> ${selectedJob.salary}
                            </div>
                            <div className="meta-item">
                                <strong>Posted:</strong> {new Date(selectedJob.postedDate).toLocaleDateString()}
                            </div>
                        </div>

                        <div className="job-description-full">
                            <h3>Description</h3>
                            <p>{selectedJob.description}</p>
                        </div>

                        <div className="job-requirements">
                            <h3>Requirements</h3>
                            <ul>
                                {selectedJob.requirements.map((req, index) => (
                                    <li key={index}>{req}</li>
                                ))}
                            </ul>
                        </div>

                        <div className="modal-actions">
                            <button
                                className={`apply-btn-large ${selectedJob.applied ? 'applied' : ''}`}
                                onClick={() => handleApply(selectedJob.id)}
                                disabled={selectedJob.applied}
                            >
                                {selectedJob.applied ? 'Already Applied' : 'Apply Now'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default JobListing;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Jobs.css';

const JobList = () => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // This would be replaced with an actual API call
        const fetchJobs = async () => {
            setIsLoading(true);
            try {
                // Simulating API call with mock data
                setTimeout(() => {
                    const mockJobs = [
                        {
                            id: 1,
                            company: 'Tech Innovations Inc.',
                            position: 'Frontend Developer',
                            location: 'San Francisco, CA',
                            status: 'applied',
                            applicationDate: '2025-04-01',
                            notes: 'Applied through LinkedIn. Waiting for response.',
                            url: 'https://techinnovations.com/careers'
                        },
                        {
                            id: 2,
                            company: 'Global Solutions',
                            position: 'Full Stack Engineer',
                            location: 'Remote',
                            status: 'interview',
                            applicationDate: '2025-03-28',
                            notes: 'First interview scheduled for next week.',
                            url: 'https://globalsolutions.com/jobs'
                        },
                        {
                            id: 3,
                            company: 'StartUp Nexus',
                            position: 'React Developer',
                            location: 'New York, NY',
                            status: 'rejected',
                            applicationDate: '2025-03-15',
                            notes: 'Rejected after technical interview.',
                            url: 'https://startupnexus.io/careers'
                        },
                        {
                            id: 4,
                            company: 'Digital Creations',
                            position: 'UI/UX Developer',
                            location: 'Boston, MA',
                            status: 'offer',
                            applicationDate: '2025-03-10',
                            notes: 'Received offer, negotiating salary.',
                            url: 'https://digitalcreations.com/opportunities'
                        }
                    ];
                    setJobs(mockJobs);
                    setIsLoading(false);
                }, 1000);
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setIsLoading(false);
            }
        };

        fetchJobs();
    }, []);

    const deleteJob = async (id) => {
        if (window.confirm('Are you sure you want to delete this job application?')) {
            try {
                // This would be replaced with an actual API call
                // await axios.delete(`/api/jobs/${id}`);
                setJobs(jobs.filter(job => job.id !== id));
            } catch (error) {
                console.error('Error deleting job:', error);
            }
        }
    };

    const filteredJobs = jobs.filter(job => {
        const matchesFilter = filter === 'all' || job.status === filter;
        const matchesSearch = job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusClass = (status) => {
        switch (status) {
            case 'applied': return 'status-applied';
            case 'interview': return 'status-interview';
            case 'offer': return 'status-offer';
            case 'rejected': return 'status-rejected';
            default: return '';
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="job-list-container">
            <div className="job-list-header">
                <h1>Job Applications</h1>
                <Link to="/jobs/add" className="btn btn-add">Add New Application</Link>
            </div>

            <div className="job-filters">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search company, position, or location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="filter-container">
                    <button
                        className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                        onClick={() => setFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`filter-btn ${filter === 'applied' ? 'active' : ''}`}
                        onClick={() => setFilter('applied')}
                    >
                        Applied
                    </button>
                    <button
                        className={`filter-btn ${filter === 'interview' ? 'active' : ''}`}
                        onClick={() => setFilter('interview')}
                    >
                        Interview
                    </button>
                    <button
                        className={`filter-btn ${filter === 'offer' ? 'active' : ''}`}
                        onClick={() => setFilter('offer')}
                    >
                        Offer
                    </button>
                    <button
                        className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
                        onClick={() => setFilter('rejected')}
                    >
                        Rejected
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="loading-container">
                    <div className="loader"></div>
                    <p>Loading job applications...</p>
                </div>
            ) : filteredJobs.length === 0 ? (
                <div className="no-jobs">
                    <p>No job applications found matching your criteria.</p>
                    <Link to="/jobs/add" className="btn btn-add-small">Add your first application</Link>
                </div>
            ) : (
                <div className="job-cards">
                    {filteredJobs.map(job => (
                        <div className="job-card" key={job.id}>
                            <div className="job-card-header">
                                <h2>{job.position}</h2>
                                <span className={`job-status ${getStatusClass(job.status)}`}>
                  {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                </span>
                            </div>
                            <div className="job-card-body">
                                <p className="job-company">{job.company}</p>
                                <p className="job-location">{job.location}</p>
                                <p className="job-date">Applied: {formatDate(job.applicationDate)}</p>
                                {job.notes && <p className="job-notes">{job.notes}</p>}
                            </div>
                            <div className="job-card-footer">
                                {job.url && (
                                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="job-link">
                                        View Job Posting
                                    </a>
                                )}
                                <div className="job-actions">
                                    <Link to={`/jobs/edit/${job.id}`} className="btn btn-edit">Edit</Link>
                                    <button onClick={() => deleteJob(job.id)} className="btn btn-delete">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default JobList;
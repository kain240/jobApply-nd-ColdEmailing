import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobListings = () => {
    const [jobListings, setJobListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchJobListings = async () => {
            try {
                const response = await axios.get('/jobs/scrape');
                setJobListings(response.data);
            } catch (err) {
                setError('Error fetching job listings');
            } finally {
                setLoading(false);
            }
        };

        fetchJobListings();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Job Listings</h2>
            <ul>
                {jobListings.map((job) => (
                    <li key={job.id}>
                        <h3>{job.title}</h3>
                        <p>{job.company}</p>
                        <p>{job.location}</p>
                        <a href={job.link} target="_blank" rel="noopener noreferrer">View Job</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default JobListings;
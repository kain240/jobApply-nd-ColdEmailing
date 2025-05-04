import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Jobs.css';

const JobForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        location: '',
        status: 'applied',
        applicationDate: new Date().toISOString().substr(0, 10),
        notes: '',
        url: ''
    });

    useEffect(() => {
        const fetchJob = async () => {
            if (id) {
                setIsLoading(true);
                try {
                    // This would be replaced with an actual API call
                    // const response = await axios.get(`/api/jobs/${id}`);

                    // Simulating API call with mock data
                    setTimeout(() => {
                        const mockJob = {
                            id: parseInt(id),
                            company: 'Tech Innovations Inc.',
                            position: 'Frontend Developer',
                            location: 'San Francisco, CA',
                            status: 'applied',
                            applicationDate: '2025-04-01',
                            notes: 'Applied through LinkedIn. Waiting for response.',
                            url: 'https://techinnovations.com/careers'
                        };
                        setFormData(mockJob);
                        setIsLoading(false);
                    }, 500);
                } catch (error) {
                    console.error('Error fetching job:', error);
                    setIsLoading(false);
                }
            }
        };

        fetchJob();
    }, [id]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // This would be replaced with an actual API call
            setTimeout(() => {
                // if (id) {
                //   await axios.put(`/api/jobs/${id}`, formData);
                // } else {
                //   await axios.post('/api/jobs', formData);
                // }
                setIsSubmitting(false);
                navigate('/jobs');
            }, 1000);
        } catch (error) {
            console.error('Error saving job:', error);
            setIsSubmitting(false);
        }
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Loading job details...</p>
            </div>
        );
    }

    return (
        <div className="job-form-container">
            <h1>{id ? 'Edit Job Application' : 'Add New Job Application'}</h1>
            <form onSubmit={handleSubmit} className="job-form">
                <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="position">Position</label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Application Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="applied">Applied</option>
                        <option value="interview">Interview</option>
                        <option value="offer">Offer</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="applicationDate">Application Date</label>
                    <input
                        type="date"
                        id="applicationDate"
                        name="applicationDate"
                        value={formData.applicationDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="url">Job Posting URL</label>
                    <input
                        type="url"
                        id="url"
                        name="url"
                        value={formData.url}
                        onChange={handleChange}
                        placeholder="https://example.com/job-posting"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="4"
                    ></textarea>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="btn btn-cancel"
                        onClick={() => navigate('/jobs')}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="btn btn-save"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save Job Application'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JobForm;
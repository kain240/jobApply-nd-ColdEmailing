import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jobsApi } from '../api/apiService';
import '../components/Layout/Jobs.css';

const JobForm = ({ initialData, isEditing = false }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [formData, setFormData] = useState({
        company: initialData?.company || '',
        position: initialData?.position || '',
        jobDescription: initialData?.jobDescription || '',
        location: initialData?.location || '',
        applicationDate: initialData?.applicationDate || '',
        applicationStatus: initialData?.applicationStatus || 'Applied',
        jobUrl: initialData?.jobUrl || '',
        contactPerson: initialData?.contactPerson || '',
        contactEmail: initialData?.contactEmail || '',
        notes: initialData?.notes || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isEditing && initialData?.id) {
                await jobsApi.updateJob(initialData.id, formData);
            } else {
                await jobsApi.createJob(formData);
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="job-form-container">
            <h2>{isEditing ? 'Edit Job Application' : 'Add New Job Application'}</h2>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="job-form">
                <div className="form-group">
                    <label htmlFor="company">Company Name*</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        placeholder="Enter company name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="position">Position*</label>
                    <input
                        type="text"
                        id="position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                        placeholder="Enter job position"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="jobDescription">Job Description</label>
                    <textarea
                        id="jobDescription"
                        name="jobDescription"
                        value={formData.jobDescription}
                        onChange={handleChange}
                        rows="5"
                        placeholder="Paste job description here"
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
                        placeholder="Remote, City, or Address"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="applicationDate">Application Date*</label>
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
                    <label htmlFor="applicationStatus">Application Status*</label>
                    <select
                        id="applicationStatus"
                        name="applicationStatus"
                        value={formData.applicationStatus}
                        onChange={handleChange}
                        required
                    >
                        <option value="Applied">Applied</option>
                        <option value="Screening">Screening</option>
                        <option value="Interview">Interview</option>
                        <option value="Technical">Technical Assessment</option>
                        <option value="Offer">Offer</option>
                        <option value="Rejected">Rejected</option>
                        <option value="Withdrawn">Withdrawn</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="jobUrl">Job URL</label>
                    <input
                        type="url"
                        id="jobUrl"
                        name="jobUrl"
                        value={formData.jobUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/job-posting"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contactPerson">Contact Person</label>
                    <input
                        type="text"
                        id="contactPerson"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        placeholder="Recruiter or hiring manager name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="contactEmail">Contact Email</label>
                    <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleChange}
                        placeholder="contact@example.com"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="3"
                        placeholder="Add any additional notes here"
                    />
                </div>

                <div className="form-buttons">
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => navigate('/dashboard')}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : (isEditing ? 'Update Application' : 'Add Application')}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default JobForm;
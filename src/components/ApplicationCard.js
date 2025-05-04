import React from 'react';
import { Link } from 'react-router-dom';
import './Jobs.css';

const ApplicationCard = ({ job, onDelete }) => {
    // Format date to be more readable
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Get status color for visual indication
    const getStatusColor = (status) => {
        switch(status) {
            case 'Applied':
                return 'status-applied';
            case 'Screening':
                return 'status-screening';
            case 'Interview':
                return 'status-interview';
            case 'Technical':
                return 'status-technical';
            case 'Offer':
                return 'status-offer';
            case 'Rejected':
                return 'status-rejected';
            case 'Withdrawn':
                return 'status-withdrawn';
            default:
                return 'status-default';
        }
    };

    return (
        <div className="application-card">
            <div className="card-header">
                <h3 className="job-position">{job.position}</h3>
                <span className={`status-badge ${getStatusColor(job.applicationStatus)}`}>
          {job.applicationStatus}
        </span>
            </div>

            <div className="card-company">
                <span className="company-name">{job.company}</span>
                {job.location && (
                    <span className="job-location">{job.location}</span>
                )}
            </div>

            <div className="card-date">
                <span className="date-label">Applied on:</span>
                <span className="date-value">{formatDate(job.applicationDate)}</span>
            </div>

            {job.contactPerson && (
                <div className="card-contact">
                    <span className="contact-name">{job.contactPerson}</span>
                    {job.contactEmail && (
                        <a href={`mailto:${job.contactEmail}`} className="contact-email">
                            {job.contactEmail}
                        </a>
                    )}
                </div>
            )}

            <div className="card-actions">
                <Link to={`/edit-application/${job.id}`} className="edit-button">
                    Edit
                </Link>

                {job.jobUrl && (
                    <a
                        href={job.jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="view-job-button"
                    >
                        View Job
                    </a>
                )}

                <Link to={`/cold-emailing?jobId=${job.id}`} className="email-button">
                    Create Email
                </Link>

                <button
                    onClick={onDelete}
                    className="delete-button"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ApplicationCard;
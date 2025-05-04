import React from 'react';
import './Emails.css';

const EmailTemplateCard = ({ template, isSelected, onSelect }) => {
    // Format the creation date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div
            className={`email-template-card ${isSelected ? 'selected' : ''}`}
            onClick={onSelect}
        >
            <div className="template-header">
                <h3 className="template-name">{template.name}</h3>
                {isSelected && (
                    <span className="selected-badge">Selected</span>
                )}
            </div>

            <div className="template-category">
                <span className="category-badge">{template.category}</span>
            </div>

            <div className="template-description">
                <p>{template.description}</p>
            </div>

            <div className="template-meta">
                <span className="template-date">Created: {formatDate(template.createdAt)}</span>
                <span className="template-uses">Uses: {template.useCount || 0}</span>
            </div>

            <div className="template-preview">
                <p className="preview-text">{template.subject.substring(0, 60)}...</p>
            </div>

            <button
                className="select-template-button"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent the card click event
                    onSelect();
                }}
            >
                {isSelected ? 'Deselect' : 'Select'}
            </button>
        </div>
    );
};

export default EmailTemplateCard;
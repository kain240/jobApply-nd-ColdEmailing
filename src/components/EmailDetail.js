import React from 'react';
import './Emails.css';

const EmailDetail = ({ email, isEditing, onChange }) => {
    if (!email) {
        return <div className="email-loading">Loading email...</div>;
    }

    return (
        <div className="email-detail-container">
            <div className="email-field">
                <div className="field-label">To:</div>
                <div className="field-value recipient">
                    {isEditing ? (
                        <input
                            type="email"
                            name="recipientEmail"
                            value={email.recipientEmail}
                            onChange={onChange}
                            required
                        />
                    ) : (
                        <span>{email.recipientName} &lt;{email.recipientEmail}&gt;</span>
                    )}
                </div>
            </div>

            <div className="email-field">
                <div className="field-label">From:</div>
                <div className="field-value sender">
                    {email.senderName || 'Your Name'} &lt;{email.senderEmail || 'your.email@example.com'}&gt;
                </div>
            </div>

            <div className="email-field">
                <div className="field-label">Subject:</div>
                <div className="field-value subject">
                    {isEditing ? (
                        <input
                            type="text"
                            name="subject"
                            value={email.subject}
                            onChange={onChange}
                            required
                        />
                    ) : (
                        <span>{email.subject}</span>
                    )}
                </div>
            </div>

            <div className="email-body">
                {isEditing ? (
                    <textarea
                        name="body"
                        value={email.body}
                        onChange={onChange}
                        rows="15"
                        required
                    />
                ) : (
                    <div className="email-body-content">
                        {email.body.split('\n').map((paragraph, index) => (
                            <p key={index}>{paragraph}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmailDetail;
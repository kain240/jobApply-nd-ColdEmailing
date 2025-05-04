import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { emailsApi } from '../api/apiService';
import EmailDetail from '../components/EmailDetail';
import '../styles/GeneratedEmail.css';

const GeneratedEmail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedEmail, setEditedEmail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sendStatus, setSendStatus] = useState(null);

    useEffect(() => {
        const fetchEmail = async () => {
            setLoading(true);
            try {
                // Assuming there's an API endpoint to fetch a generated email by ID
                const emailData = await emailsApi.getGeneratedEmail(id);
                setEmail(emailData);
                setEditedEmail(emailData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEmail();
    }, [id]);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            // Save the edited email
            await emailsApi.updateGeneratedEmail(id, editedEmail);
            setEmail(editedEmail);
            setIsEditing(false);
            setSendStatus({ type: 'success', message: 'Email saved successfully!' });

            // Clear status message after 3 seconds
            setTimeout(() => setSendStatus(null), 3000);
        } catch (err) {
            setError(err.message);
            setSendStatus({ type: 'error', message: 'Failed to save email.' });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEditedEmail(email);
        setIsEditing(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedEmail(prev => ({ ...prev, [name]: value }));
    };

    const handleSendEmail = async () => {
        if (window.confirm('Are you sure you want to send this email?')) {
            setLoading(true);
            try {
                await emailsApi.sendEmail(email);
                setSendStatus({ type: 'success', message: 'Email sent successfully!' });

                // Navigate back to dashboard after 2 seconds
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
            } catch (err) {
                setError(err.message);
                setSendStatus({ type: 'error', message: 'Failed to send email.' });
                setLoading(false);
            }
        }
    };

    const handleCopyToClipboard = () => {
        const emailText = `To: ${email.recipientEmail}
Subject: ${email.subject}

${email.body}`;

        navigator.clipboard.writeText(emailText)
            .then(() => {
                setSendStatus({ type: 'success', message: 'Email copied to clipboard!' });
                setTimeout(() => setSendStatus(null), 3000);
            })
            .catch(err => {
                setError('Failed to copy email to clipboard.');
            });
    };

    if (loading && !email) {
        return <div className="loading">Loading email...</div>;
    }

    if (error && !email) {
        return <div className="error">Error: {error}</div>;
    }

    if (!email) {
        return <div className="not-found">Email not found.</div>;
    }

    return (
        <div className="generated-email-container">
            <h1>Generated Email</h1>

            {sendStatus && (
                <div className={`status-message ${sendStatus.type}`}>
                    {sendStatus.message}
                </div>
            )}

            <div className="email-actions">
                <button
                    onClick={() => navigate('/cold-emailing')}
                    className="back-button"
                >
                    Back to Templates
                </button>

                {isEditing ? (
                    <>
                        <button onClick={handleSave} className="save-button">
                            Save Changes
                        </button>
                        <button onClick={handleCancel} className="cancel-button">
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={handleEdit} className="edit-button">
                            Edit Email
                        </button>
                        <button onClick={handleCopyToClipboard} className="copy-button">
                            Copy to Clipboard
                        </button>
                        <button onClick={handleSendEmail} className="send-button" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Email'}
                        </button>
                    </>
                )}
            </div>

            <div className="email-preview">
                <EmailDetail
                    email={isEditing ? editedEmail : email}
                    isEditing={isEditing}
                    onChange={handleChange}
                />
            </div>
        </div>
    );
};

export default GeneratedEmail;
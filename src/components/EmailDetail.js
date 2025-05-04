import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './Emails.css';

const EmailDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [email, setEmail] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showResponseForm, setShowResponseForm] = useState(false);
    const [responseData, setResponseData] = useState({
        content: '',
        receivedDate: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        const fetchEmailDetail = async () => {
            setIsLoading(true);
            try {
                // Simulating API call with mock data
                setTimeout(() => {
                    const mockEmail = {
                        id: parseInt(id),
                        recipientName: 'John Smith',
                        recipientEmail: 'john.smith@company.com',
                        company: 'Tech Innovations Inc.',
                        subject: 'Following up on our conversation',
                        body: `Dear John Smith,

I hope you're doing well. I'm writing to follow up on our conversation from last week about the Frontend Developer position at Tech Innovations Inc.

I remain very interested in the opportunity to join your team and contribute my skills in React, TypeScript, and UI/UX design. 

If you need any additional information from me or would like to schedule another interview, please let me know. I'm looking forward to the opportunity to discuss this further.

Thank you for your time and consideration.

Best regards,
Sarah Johnson
555-123-4567
sarah.johnson@email.com`,
                        status: 'sent',
                        sentDate: '2025-04-02',
                        responseReceived: id % 2 === 1, // Mock: odd IDs have responses
                        responseDate: id % 2 === 1 ? '2025-04-03' : null,
                        responseContent: id % 2 === 1 ? `Dear Sarah,

Thank you for your follow-up. I appreciate your continued interest in the position.

I'm pleased to inform you that we'd like to schedule a second interview with our team lead. Would you be available next Tuesday at 2 PM?

Looking forward to your response.

Best regards,
John Smith
Tech Innovations Inc.` : null,
                        templateUsed: 'Follow-up Template'
                    };

                    setEmail(mockEmail);
                    setIsLoading(false);
                }, 700);
            } catch (error) {
                console.error('Error fetching email details:', error);
                setIsLoading(false);
            }
        };

        fetchEmailDetail();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this email?')) {
            try {
                // This would be replaced with an actual API call
                // await axios.delete(`/api/emails/${id}`);
                navigate('/emails');
            } catch (error) {
                console.error('Error deleting email:', error);
            }
        }
    };

    const toggleResponseForm = () => {
        setShowResponseForm(!showResponseForm);
    };

    const handleResponseChange = (e) => {
        const { name, value } = e.target;
        setResponseData({ ...responseData, [name]: value });
    };

    const saveResponse = async () => {
        try {
            // This would be replaced with an actual API call
            // await axios.post(`/api/emails/${id}/response`, responseData);

            setEmail({
                ...email,
                responseReceived: true,
                responseDate: responseData.receivedDate,
                responseContent: responseData.content
            });

            setShowResponseForm(false);
        } catch (error) {
            console.error('Error saving response:', error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Loading email details...</p>
            </div>
        );
    }

    if (!email) {
        return (
            <div className="not-found">
                <h2>Email not found</h2>
                <Link to="/emails" className="btn btn-primary">Back to Emails</Link>
            </div>
        );
    }

    return (
        <div className="email-detail-container">
            <div className="email-detail-header">
                <h1>{email.subject}</h1>
                <div className="header-actions">
                    <Link to={`/emails/edit/${id}`} className="btn btn-secondary">
                        Edit Email
                    </Link>
                    <button onClick={handleDelete} className="btn btn-delete">
                        Delete
                    </button>
                </div>
            </div>

            <div className="email-metadata">
                <div className="metadata-item">
                    <span className="label">Status:</span>
                    <span className={`email-status status-${email.status}`}>
            {email.status.charAt(0).toUpperCase() + email.status.slice(1)}
          </span>
                </div>
                {email.sentDate && (
                    <div className="metadata-item">
                        <span className="label">Sent on:</span>
                        <span>{formatDate(email.sentDate)}</span>
                    </div>
                )}
                <div className="metadata-item">
                    <span className="label">Template:</span>
                    <span>{email.templateUsed}</span>
                </div>
            </div>

            <div className="email-content-card">
                <div className="email-header-info">
                    <div><strong>To:</strong> {email.recipientName} &lt;{email.recipientEmail}&gt;</div>
                    <div><strong>Company:</strong> {email.company}</div>
                    <div><strong>Subject:</strong> {email.subject}</div>
                </div>
                <div className="email-body">
                    <pre>{email.body}</pre>
                </div>
            </div>

            <div className="response-section">
                <h2>Response</h2>

                {email.responseReceived ? (
                    <div className="response-content-card">
                        <div className="response-metadata">
                            <div><strong>Received on:</strong> {formatDate(email.responseDate)}</div>
                        </div>
                        <div className="response-body">
                            <pre>{email.responseContent}</pre>
                        </div>
                    </div>
                ) : showResponseForm ? (
                    <div className="response-form-container">
                        <div className="form-group">
                            <label htmlFor="receivedDate">Date Received</label>
                            <input
                                type="date"
                                id="receivedDate"
                                name="receivedDate"
                                value={responseData.receivedDate}
                                onChange={handleResponseChange}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="content">Response Content</label>
                            <textarea
                                id="content"
                                name="content"
                                value={responseData.content}
                                onChange={handleResponseChange}
                                className="form-control"
                                rows="10"
                                placeholder="Paste the response here..."
                                required
                            ></textarea>
                        </div>
                        <div className="button-row">
                            <button type="button" onClick={toggleResponseForm} className="btn btn-cancel">
                                Cancel
                            </button>
                            <button type="button" onClick={saveResponse} className="btn btn-primary">
                                Save Response
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="no-response">
                        <p>No response has been recorded for this email yet.</p>
                        <button onClick={toggleResponseForm} className="btn btn-add-small">
                            Add Response
                        </button>
                    </div>
                )}
            </div>

            <div className="button-row back-button">
                <Link to="/emails" className="btn btn-secondary">
                    Back to Email List
                </Link>
            </div>
        </div>
    );
};

export default EmailDetail;
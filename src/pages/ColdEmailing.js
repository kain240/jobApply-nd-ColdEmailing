import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { jobsApi, emailsApi } from '../api/apiService';
import EmailTemplateCard from '../components/EmailTemplateCard';
import '../styles/ColdEmailForm.css';

const ColdEmailing = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const jobId = queryParams.get('jobId');

    const [job, setJob] = useState(null);
    const [templates, setTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [customInput, setCustomInput] = useState({
        recipientName: '',
        recipientEmail: '',
        additionalContext: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch templates
                const templatesData = await emailsApi.getTemplates();
                setTemplates(templatesData);

                // If jobId is provided, fetch job details
                if (jobId) {
                    const jobData = await jobsApi.getJob(jobId);
                    setJob(jobData);

                    // Pre-fill form if job has contact info
                    if (jobData.contactPerson || jobData.contactEmail) {
                        setCustomInput({
                            recipientName: jobData.contactPerson || '',
                            recipientEmail: jobData.contactEmail || '',
                            additionalContext: `I'm reaching out regarding the ${jobData.position} position at ${jobData.company}.`
                        });
                    }
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [jobId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomInput(prev => ({ ...prev, [name]: value }));
    };

    const handleTemplateSelect = (template) => {
        if (selectedTemplate && selectedTemplate.id === template.id) {
            setSelectedTemplate(null); // Deselect if already selected
        } else {
            setSelectedTemplate(template); // Select new template
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedTemplate) {
            alert('Please select an email template');
            return;
        }

        setLoading(true);

        try {
            // Generate email from template and job data
            const emailData = {
                templateId: selectedTemplate.id,
                jobData: job || null,
                customData: customInput
            };

            const generatedEmail = await emailsApi.generateEmail(selectedTemplate.id, {
                ...job,
                ...customInput
            });

            // Navigate to the generated email page
            navigate(`/generated-email/${generatedEmail.id}`);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Create a new template
    const handleCreateTemplate = () => {
        navigate('/email-templates/new');
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="cold-email-container">
            <h1>Cold Email Generator</h1>
            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit} className="email-form">
                <div className="form-section">
                    <h2>Recipient Information</h2>
                    <div className="form-group">
                        <label htmlFor="recipientName">Recipient Name:</label>
                        <input
                            type="text"
                            id="recipientName"
                            name="recipientName"
                            value={customInput.recipientName}
                            onChange={handleInputChange}
                            placeholder="e.g., John Smith"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="recipientEmail">Recipient Email:</label>
                        <input
                            type="email"
                            id="recipientEmail"
                            name="recipientEmail"
                            value={customInput.recipientEmail}
                            onChange={handleInputChange}
                            placeholder="e.g., john.smith@company.com"
                            required
                        />
                    </div>

                    {job && (
                        <div className="job-info-box">
                            <h3>Using job application data:</h3>
                            <p><strong>Company:</strong> {job.company}</p>
                            <p><strong>Position:</strong> {job.position}</p>
                        </div>
                    )}
                </div>

                <div className="form-section">
                    <h2>Additional Context</h2>
                    <div className="form-group">
                        <label htmlFor="additionalContext">Specific details you want to include:</label>
                        <textarea
                            id="additionalContext"
                            name="additionalContext"
                            value={customInput.additionalContext}
                            onChange={handleInputChange}
                            rows="4"
                            placeholder="Add any specific details you'd like to include in your email..."
                        />
                    </div>
                </div>

                <div className="form-section">
                    <div className="templates-header">
                        <h2>Select Email Template</h2>
                        <button
                            type="button"
                            className="create-template-button"
                            onClick={handleCreateTemplate}
                        >
                            + Create New Template
                        </button>
                    </div>

                    {templates.length === 0 ? (
                        <div className="no-templates">
                            <p>No email templates found. Please create your first template.</p>
                        </div>
                    ) : (
                        <div className="templates-grid">
                            {templates.map(template => (
                                <EmailTemplateCard
                                    key={template.id}
                                    template={template}
                                    isSelected={selectedTemplate && selectedTemplate.id === template.id}
                                    onSelect={() => handleTemplateSelect(template)}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        className="cancel-button"
                        onClick={() => navigate('/dashboard')}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="generate-button"
                        disabled={loading || !selectedTemplate}
                    >
                        {loading ? 'Generating...' : 'Generate Email'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ColdEmailing;
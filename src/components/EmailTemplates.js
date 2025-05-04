import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Emails.css';

const EmailTemplates = () => {
    const [templates, setTemplates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTemplate, setActiveTemplate] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        subject: '',
        body: ''
    });

    useEffect(() => {
        // This would be replaced with an actual API call
        const fetchTemplates = async () => {
            setIsLoading(true);
            try {
                // Simulating API call with mock data
                setTimeout(() => {
                    const mockTemplates = [
                        {
                            id: 1,
                            name: 'Initial Contact Template',
                            subject: 'Interest in {{position}} position at {{company}}',
                            body: `Dear {{recipientName}},

I hope this email finds you well. My name is {{senderName}}, and I came across the {{position}} position at {{company}}. I am very interested in this opportunity and believe my skills and experience align well with what you're looking for.

I have {{years}} years of experience in {{skill1}}, {{skill2}}, and {{skill3}}. In my previous role at {{previousCompany}}, I successfully {{achievement}}.

I would love the opportunity to discuss how my background might be a good fit for this position. Would you be available for a brief call next week?

Thank you for considering my application. I look forward to hearing from you.

Best regards,
{{senderName}}
{{senderPhone}}
{{senderEmail}}
{{senderLinkedIn}}`
                        },
                        {
                            id: 2,
                            name: 'Follow-up Template',
                            subject: 'Following up on {{position}} application',
                            body: `Dear {{recipientName}},

I hope you're doing well. I'm writing to follow up on my application for the {{position}} position that I submitted on {{applicationDate}}.

I remain very interested in the opportunity to join {{company}} and contribute my skills in {{skill1}} and {{skill2}} to your team. 

If you need any additional information from me or would like to schedule an interview, please let me know. I'm looking forward to the opportunity to discuss my application further.

Thank you for your time and consideration.

Best regards,
{{senderName}}
{{senderPhone}}
{{senderEmail}}`
                        },
                        {
                            id: 3,
                            name: 'Networking Template',
                            subject: 'Impressed by your work at {{company}}',
                            body: `Dear {{recipientName}},

My name is {{senderName}} and I recently came across your profile on LinkedIn. I was particularly impressed by your work on {{projectOrAchievement}} at {{company}}.

I am a {{profession}} with experience in {{industry}} and I'm very interested in learning more about your field and company. I would greatly appreciate the opportunity to connect and perhaps have a brief conversation about your experiences at {{company}}.

Would you be available for a 15-minute call in the coming weeks? I'd be grateful for any insights you might be willing to share.

Thank you for considering my request.

Best regards,
{{senderName}}
{{senderEmail}}
{{senderLinkedIn}}`
                        },
                        {
                            id: 4,
                            name: 'Informational Interview Template',
                            subject: 'Request for an informational interview about {{topic}}',
                            body: `Dear {{recipientName}},

I hope this email finds you well. My name is {{senderName}}, and I am a {{profession}} interested in learning more about {{topic}} and your experiences at {{company}}.

I've been following your work on {{specificProject}} and am impressed by your approach to {{specificAspect}}. I would greatly value the opportunity to learn from your experiences through a brief informational interview.

Would you be willing to spare 20-30 minutes for a call in the next few weeks? I'm particularly interested in discussing {{specificQuestion1}} and {{specificQuestion2}}.

Thank you for considering my request. I understand you're busy, and I appreciate any time you can offer.

Best regards,
{{senderName}}
{{senderPhone}}
{{senderEmail}}
{{senderLinkedIn}}`
                        }
                    ];
                    setTemplates(mockTemplates);
                    setIsLoading(false);
                }, 800);
            } catch (error) {
                console.error('Error fetching templates:', error);
                setIsLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    const selectTemplate = (template) => {
        setActiveTemplate(template);
        setFormData({
            name: template.name,
            subject: template.subject,
            body: template.body
        });
        setEditMode(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const createNewTemplate = () => {
        setActiveTemplate(null);
        setFormData({
            name: 'New Template',
            subject: '',
            body: ''
        });
        setEditMode(true);
    };

    const editTemplate = () => {
        setEditMode(true);
    };

    const cancelEdit = () => {
        if (activeTemplate) {
            setFormData({
                name: activeTemplate.name,
                subject: activeTemplate.subject,
                body: activeTemplate.body
            });
        } else {
            setFormData({
                name: '',
                subject: '',
                body: ''
            });
        }
        setEditMode(false);
    };

    const saveTemplate = async () => {
        try {
            // This would be replaced with an actual API call
            if (activeTemplate) {
                // Update existing template
                // await axios.put(`/api/email-templates/${activeTemplate.id}`, formData);

                // Update local state
                const updatedTemplates = templates.map(template =>
                    template.id === activeTemplate.id ? { ...template, ...formData } : template
                );
                setTemplates(updatedTemplates);
                setActiveTemplate({ ...activeTemplate, ...formData });
            } else {
                // Create new template
                // const response = await axios.post('/api/email-templates', formData);

                // Update local state with mock ID
                const newTemplate = {
                    id: Math.max(...templates.map(t => t.id), 0) + 1,
                    ...formData
                };
                setTemplates([...templates, newTemplate]);
                setActiveTemplate(newTemplate);
            }
            setEditMode(false);
        } catch (error) {
            console.error('Error saving template:', error);
        }
    };

    const deleteTemplate = async () => {
        if (!activeTemplate) return;

        if (window.confirm(`Are you sure you want to delete the template "${activeTemplate.name}"?`)) {
            try {
                // This would be replaced with an actual API call
                // await axios.delete(`/api/email-templates/${activeTemplate.id}`);

                // Update local state
                setTemplates(templates.filter(template => template.id !== activeTemplate.id));
                setActiveTemplate(null);
                setFormData({
                    name: '',
                    subject: '',
                    body: ''
                });
            } catch (error) {
                console.error('Error deleting template:', error);
            }
        }
    };

    const filteredTemplates = templates.filter(template =>
        template.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getPlaceholders = (text) => {
        const regex = /{{([^}]+)}}/g;
        const placeholders = new Set();
        let match;

        while ((match = regex.exec(text)) !== null) {
            placeholders.add(match[1]);
        }

        return Array.from(placeholders);
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Loading templates...</p>
            </div>
        );
    }

    return (
        <div className="email-templates-container">
            <div className="templates-header">
                <h1>Email Templates</h1>
                <div className="header-actions">
                    <Link to="/emails" className="btn btn-secondary">Back to Emails</Link>
                    <button onClick={createNewTemplate} className="btn btn-add">Create New Template</button>
                </div>
            </div>

            <div className="templates-content">
                <div className="templates-sidebar">
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Search templates..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                    </div>
                    <div className="template-list">
                        {filteredTemplates.length === 0 ? (
                            <div className="no-templates">
                                <p>No templates found.</p>
                            </div>
                        ) : (
                            filteredTemplates.map(template => (
                                <div
                                    key={template.id}
                                    className={`template-item ${activeTemplate && activeTemplate.id === template.id ? 'active' : ''}`}
                                    onClick={() => selectTemplate(template)}
                                >
                                    <div className="template-item-name">{template.name}</div>
                                    <div className="template-item-subject">{template.subject}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="template-details">
                    {!activeTemplate && !editMode ? (
                        <div className="no-template-selected">
                            <h2>Select a template or create a new one</h2>
                            <p>Templates help you save time by reusing common email formats with placeholders for personalization.</p>
                            <button onClick={createNewTemplate} className="btn btn-add-large">Create New Template</button>
                        </div>
                    ) : (
                        <div className="template-editor">
                            {editMode ? (
                                <div className="edit-form">
                                    <div className="form-group">
                                        <label htmlFor="name">Template Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="subject">Subject Line</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="form-control"
                                            required
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="body">Email Body</label>
                                        <textarea
                                            id="body"
                                            name="body"
                                            value={formData.body}
                                            onChange={handleChange}
                                            className="form-control"
                                            rows="15"
                                            required
                                        ></textarea>
                                    </div>

                                    <div className="template-placeholders">
                                        <h3>Available Placeholders</h3>
                                        <div className="placeholder-list">
                                            {getPlaceholders(formData.subject + formData.body).map((placeholder, index) => (
                                                <div key={index} className="placeholder-tag">
                                                    {`{{${placeholder}}}`}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="placeholder-info">
                                            <p>Wrap placeholder text in double curly braces like: <code>{{'{{'}}recipientName{{'}}'}}</code></p>
                                        </div>
                                    </div>

                                    <div className="button-row">
                                        <button onClick={cancelEdit} className="btn btn-cancel">
                                            Cancel
                                        </button>
                                        <button onClick={saveTemplate} className="btn btn-primary">
                                            Save Template
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="template-view">
                                    <div className="template-view-header">
                                        <h2>{activeTemplate.name}</h2>
                                        <div className="template-actions">
                                            <button onClick={editTemplate} className="btn btn-edit">
                                                Edit Template
                                            </button>
                                            <button onClick={deleteTemplate} className="btn btn-delete">
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                    <div className="template-preview">
                                        <div className="preview-section">
                                            <h3>Subject</h3>
                                            <div className="preview-subject">{activeTemplate.subject}</div>
                                        </div>

                                        <div className="preview-section">
                                            <h3>Body</h3>
                                            <div className="preview-body">
                                                <pre>{activeTemplate.body}</pre>
                                            </div>
                                        </div>

                                        <div className="template-placeholders">
                                            <h3>Placeholders</h3>
                                            <div className="placeholder-list">
                                                {getPlaceholders(activeTemplate.subject + activeTemplate.body).map((placeholder, index) => (
                                                    <div key={index} className="placeholder-tag">
                                                        {`{{${placeholder}}}`}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="use-template-section">
                                        <Link to={`/emails/add?template=${activeTemplate.id}`} className="btn btn-primary">
                                            Use This Template
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmailTemplates;
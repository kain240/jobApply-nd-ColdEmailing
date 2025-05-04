import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Emails.css';

const EmailForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = !!id;

    const [templates, setTemplates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        recipientName: '',
        recipientEmail: '',
        company: '',
        subject: '',
        body: '',
        status: 'draft',
        scheduledDate: '',
        templateId: ''
    });
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        const fetchTemplates = async () => {
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

                    if (isEditMode) {
                        fetchEmailData();
                    } else {
                        setIsLoading(false);
                    }
                }, 500);
            } catch (error) {
                console.error('Error fetching templates:', error);
                setIsLoading(false);
            }
        };

        const fetchEmailData = async () => {
            try {
                // Simulating API call with mock data
                setTimeout(() => {
                    // Mock email data for editing
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
                        status: 'draft',
                        scheduledDate: '2025-05-10',
                        templateId: 2
                    };

                    setFormData(mockEmail);
                    setIsLoading(false);
                }, 700);
            } catch (error) {
                console.error('Error fetching email data:', error);
                setIsLoading(false);
            }
        };

        fetchTemplates();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleTemplateChange = (e) => {
        const templateId = parseInt(e.target.value);
        if (!templateId) {
            return;
        }

        const selectedTemplate = templates.find(template => template.id === templateId);
        if (selectedTemplate) {
            // Keep recipient information but update subject and body
            setFormData({
                ...formData,
                templateId: templateId,
                subject: selectedTemplate.subject
                    .replace('{{company}}', formData.company)
                    .replace('{{recipientName}}', formData.recipientName),
                body: selectedTemplate.body
                    .replace(/{{company}}/g, formData.company)
                    .replace(/{{recipientName}}/g, formData.recipientName)
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // This would be replaced with an actual API call
            // if (isEditMode) {
            //   await axios.put(`/api/emails/${id}`, formData);
            // } else {
            //   await axios.post('/api/emails', formData);
            // }

            // Navigate back to email list
            navigate('/emails');
        } catch (error) {
            console.error('Error saving email:', error);
        }
    };

    const handleSchedule = async (e) => {
        e.preventDefault();

        if (!formData.scheduledDate) {
            alert('Please select a scheduled date before scheduling the email.');
            return;
        }

        try {
            const scheduledEmail = {
                ...formData,
                status: 'scheduled'
            };

            // This would be replaced with an actual API call
            // if (isEditMode) {
            //   await axios.put(`/api/emails/${id}`, scheduledEmail);
            // } else {
            //   await axios.post('/api/emails', scheduledEmail);
            // }

            // Navigate back to email list
            navigate('/emails');
        } catch (error) {
            console.error('Error scheduling email:', error);
        }
    };

    const handleSendNow = async (e) => {
        e.preventDefault();

        try {
            const sentEmail = {
                ...formData,
                status: 'sent',
                sentDate: new Date().toISOString().split('T')[0]
            };

            // This would be replaced with an actual API call
            // if (isEditMode) {
            //   await axios.put(`/api/emails/${id}`, sentEmail);
            // } else {
            //   await axios.post('/api/emails', sentEmail);
            // }

            // Navigate back to email list
            navigate('/emails');
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const togglePreview = () => {
        setShowPreview(!showPreview);
    };

    // Function to replace placeholders in the template with actual values
    const fillTemplate = (template) => {
        // Get user profile info from localStorage or a context
        const userProfile = {
            name: 'Sarah Johnson',
            email: 'sarah.johnson@email.com',
            phone: '555-123-4567',
            linkedin: 'https://linkedin.com/in/sarahjohnson',
            profession: 'Frontend Developer',
            years: '5',
            skills: ['React', 'TypeScript', 'UI/UX Design'],
            previousCompany: 'Web Solutions Ltd',
            achievement: 'led the frontend development of a major e-commerce platform redesign'
        };

        // Common replacements
        let filledTemplate = template
            .replace(/{{senderName}}/g, userProfile.name)
            .replace(/{{senderEmail}}/g, userProfile.email)
            .replace(/{{senderPhone}}/g, userProfile.phone)
            .replace(/{{senderLinkedIn}}/g, userProfile.linkedin)
            .replace(/{{recipientName}}/g, formData.recipientName)
            .replace(/{{company}}/g, formData.company)
            .replace(/{{profession}}/g, userProfile.profession)
            .replace(/{{years}}/g, userProfile.years)
            .replace(/{{skill1}}/g, userProfile.skills[0] || '')
            .replace(/{{skill2}}/g, userProfile.skills[1] || '')
            .replace(/{{skill3}}/g, userProfile.skills[2] || '')
            .replace(/{{previousCompany}}/g, userProfile.previousCompany)
            .replace(/{{achievement}}/g, userProfile.achievement);

        // Other placeholders would remain as they are since they're specific to each email
        return filledTemplate;
    };

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="email-form-container">
            <div className="email-form-header">
                <h1>{isEditMode ? 'Edit Email' : 'Compose New Email'}</h1>
                <button onClick={togglePreview} className="btn btn-preview">
                    {showPreview ? 'Edit Email' : 'Preview Email'}
                </button>
            </div>

            {showPreview ? (
                <div className="email-preview">
                    <div className="preview-header">
                        <div><strong>To:</strong> {formData.recipientName} &lt;{formData.recipientEmail}&gt;</div>
                        <div><strong>Subject:</strong> {formData.subject}</div>
                    </div>
                    <div className="preview-body">
                        <pre>{formData.body}</pre>
                    </div>
                    <div className="button-row">
                        <button onClick={togglePreview} className="btn btn-secondary">Back to Editing</button>
                        <button onClick={handleSendNow} className="btn btn-primary">Send Now</button>
                        <button onClick={handleSchedule} className="btn btn-schedule">Schedule</button>
                    </div>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="email-form">
                    <div className="form-group template-selector">
                        <label htmlFor="templateId">Select Template</label>
                        <select
                            id="templateId"
                            name="templateId"
                            value={formData.templateId}
                            onChange={handleTemplateChange}
                            className="form-control"
                        >
                            <option value="">-- Select a Template --</option>
                            {templates.map(template => (
                                <option key={template.id} value={template.id}>
                                    {template.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="recipientName">Recipient Name</label>
                            <input
                                type="text"
                                id="recipientName"
                                name="recipientName"
                                value={formData.recipientName}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="recipientEmail">Recipient Email</label>
                            <input
                                type="email"
                                id="recipientEmail"
                                name="recipientEmail"
                                value={formData.recipientEmail}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="company">Company</label>
                        <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            className="form-control"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
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

                    <div className="form-group scheduling-options">
                        <label htmlFor="scheduledDate">Schedule for Later</label>
                        <input
                            type="date"
                            id="scheduledDate"
                            name="scheduledDate"
                            value={formData.scheduledDate}
                            onChange={handleChange}
                            className="form-control"
                            min={new Date().toISOString().split('T')[0]}
                        />
                    </div>

                    <div className="button-row">
                        <button type="button" onClick={() => navigate('/emails')} className="btn btn-cancel">
                            Cancel
                        </button>
                        <button type="submit" className="btn btn-save">
                            Save as Draft
                        </button>
                        <button type="button" onClick={handleSchedule} className="btn btn-schedule">
                            Schedule
                        </button>
                        <button type="button" onClick={handleSendNow} className="btn btn-primary">
                            Send Now
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EmailForm;

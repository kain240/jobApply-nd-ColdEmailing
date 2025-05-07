import React, { useState, useEffect } from 'react';
import { sendEmailDraft } from '../services/api';

const EmailDraft = () => {
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [emailTemplates, setEmailTemplates] = useState([]);
    const [selectedTemplate, setSelectedTemplate] = useState('');

    useEffect(() => {
        // Fetch email templates from the backend
        const fetchTemplates = async () => {
            try {
                const response = await fetch('/api/email/templates');
                const data = await response.json();
                setEmailTemplates(data);
            } catch (error) {
                console.error('Error fetching email templates:', error);
            }
        };

        fetchTemplates();
    }, []);

    const handleTemplateChange = (event) => {
        const template = emailTemplates.find(t => t.id === event.target.value);
        if (template) {
            setSubject(template.subject);
            setBody(template.body);
            setSelectedTemplate(template.id);
        }
    };

    const handleSendEmail = async () => {
        const emailData = {
            subject,
            body,
            templateId: selectedTemplate,
        };

        try {
            await sendEmailDraft(emailData);
            alert('Email draft sent successfully!');
            setSubject('');
            setBody('');
            setSelectedTemplate('');
        } catch (error) {
            console.error('Error sending email draft:', error);
            alert('Failed to send email draft.');
        }
    };

    return (
        <div className="email-draft">
            <h2>Draft Cold Email</h2>
            <select onChange={handleTemplateChange} value={selectedTemplate}>
                <option value="">Select Template</option>
                {emailTemplates.map(template => (
                    <option key={template.id} value={template.id}>
                        {template.name}
                    </option>
                ))}
            </select>
            <div>
                <label>Subject:</label>
                <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                />
            </div>
            <div>
                <label>Body:</label>
                <textarea
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </div>
            <button onClick={handleSendEmail}>Send Email Draft</button>
        </div>
    );
};

export default EmailDraft;
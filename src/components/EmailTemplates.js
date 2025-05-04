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
        const fetchTemplates = async () => {
            setIsLoading(true);
            try {
                setTimeout(() => {
                    const mockTemplates = [
                        // mock template objects here...
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

    const editTemplate = () => setEditMode(true);

    const cancelEdit = () => {
        if (activeTemplate) {
            setFormData({
                name: activeTemplate.name,
                subject: activeTemplate.subject,
                body: activeTemplate.body
            });
        } else {
            setFormData({ name: '', subject: '', body: '' });
        }
        setEditMode(false);
    };

    const saveTemplate = async () => {
        try {
            if (activeTemplate) {
                const updatedTemplates = templates.map(template =>
                    template.id === activeTemplate.id ? { ...template, ...formData } : template
                );
                setTemplates(updatedTemplates);
                setActiveTemplate({ ...activeTemplate, ...formData });
            } else {
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
                setTemplates(templates.filter(template => template.id !== activeTemplate.id));
                setActiveTemplate(null);
                setFormData({ name: '', subject: '', body: '' });
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
                                                <div key={index} className="placeholder-item">
                                                    {`{{${placeholder}}}`}

                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="editor-actions">
                                        <button onClick={saveTemplate} className="btn btn-primary">Save</button>
                                        <button onClick={cancelEdit} className="btn btn-secondary">Cancel</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="view-template">
                                    <h2>{activeTemplate.name}</h2>
                                    <h4>Subject:</h4>
                                    <p>{activeTemplate.subject}</p>
                                    <h4>Body:</h4>
                                    <pre className="email-body">{activeTemplate.body}</pre>
                                    <div className="editor-actions">
                                        <button onClick={editTemplate} className="btn btn-primary">Edit</button>
                                        <button onClick={deleteTemplate} className="btn btn-danger">Delete</button>
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

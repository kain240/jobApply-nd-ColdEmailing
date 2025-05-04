import React, { useState } from 'react';
//import '../styles/ColdEmailing.css';

function ColdEmailing() {
    const [step, setStep] = useState(1);
    const [resume, setResume] = useState(null);
    const [resumeUploaded, setResumeUploaded] = useState(false);
    const [formData, setFormData] = useState({
        companyName: '',
        role: '',
        skills: ''
    });
    const [generatedEmail, setGeneratedEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setResume(file);
        }
    };

    const handleResumeUpload = async (e) => {
        e.preventDefault();
        if (!resume) {
            setError('Please select a resume file to upload');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const formData = new FormData();
            formData.append('resume', resume);

            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/cold-email/upload-resume', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Resume upload failed');
            }

            const data = await response.json();
            setResumeUploaded(true);
            setSuccess('Resume uploaded successfully!');

            // Move to next step after a brief delay
            setTimeout(() => {
                setStep(2);
                setSuccess('');
            }, 1500);
        } catch (err) {
            console.error('Error uploading resume:', err);
            setError('Failed to upload resume. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleGenerateEmail = async (e) => {
        e.preventDefault();

        if (!formData.companyName || !formData.role || !formData.skills) {
            setError('All fields are required');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/cold-email/generate', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Email generation failed');
            }

            const data = await response.json();
            setGeneratedEmail(data.email);
            setStep(3);
        } catch (err) {
            console.error('Error generating email:', err);
            setError('Failed to generate email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSendEmail = async () => {
        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/cold-email/send', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    emailContent: generatedEmail
                })
            });

            if (!response.ok) {
                throw new Error('Failed to send email');
            }

            const data = await response.json();
            setSuccess('Email sent successfully!');

            // Reset the form after successful submission
            setTimeout(() => {
                setStep(1);
                setFormData({
                    companyName: '',
                    role: '',
                    skills: ''
                });
                setResume(null);
                setResumeUploaded(false);
                setGeneratedEmail('');
                setSuccess('');
            }, 3000);
        } catch (err) {
            console.error('Error sending email:', err);
            setError('Failed to send email. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const editEmail = () => {
        setStep(2);
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="upload-resume-step">
                        <h2>Upload Your Resume</h2>
                        <p>First, we need your resume to craft a personalized cold email.</p>

                        <form onSubmit={handleResumeUpload} className="resume-upload-form">
                            <div className="file-upload">
                                <label htmlFor="resume-upload">
                                    {resume ? resume.name : 'Select your resume file'}
                                </label>
                                <input
                                    type="file"
                                    id="resume-upload"
                                    accept=".pdf,.doc,.docx"
                                    onChange={handleResumeChange}
                                />
                                <span className="file-hint">Supported formats: PDF, DOC, DOCX</span>
                            </div>

                            <button
                                type="submit"
                                className="upload-button"
                                disabled={loading || !resume}
                            >
                                {loading ? 'Uploading...' : 'Upload Resume'}
                            </button>
                        </form>
                    </div>
                );

            case 2:
                return (
                    <div className="company-info-step">
                        <h2>Company Details</h2>
                        <p>Now, tell us about the company you want to reach out to.</p>

                        <form onSubmit={handleGenerateEmail} className="company-form">
                            <div className="form-group">
                                <label htmlFor="skills">Relevant Skills</label>
                                <textarea
                                    id="skills"
                                    name="skills"
                                    value={formData.skills}
                                    onChange={handleInputChange}
                                    placeholder="e.g., React, JavaScript, CSS, UI/UX design"
                                    required
                                />
                                <span className="input-hint">List skills relevant to the role, separated by commas</span>
                            </div>

                            <button
                                type="submit"
                                className="generate-button"
                                disabled={loading}
                            >
                                {loading ? 'Generating...' : 'Generate Email'}
                            </button>
                        </form>
                    </div>
                );

            case 3:
                return (
                    <div className="email-preview-step">
                        <h2>Your Personalized Cold Email</h2>
                        <p>Here's your generated email. You can send it now or go back to edit company details.</p>

                        <div className="email-preview">
                            <div className="email-content">
                                {generatedEmail.split('\n').map((line, index) => (
                                    <p key={index}>{line}</p>
                                ))}
                            </div>
                        </div>

                        <div className="email-actions">
                            <button
                                className="edit-button"
                                onClick={editEmail}
                            >
                                Edit Details
                            </button>
                            <button
                                className="send-button"
                                onClick={handleSendEmail}
                                disabled={loading}
                            >
                                {loading ? 'Sending...' : 'Send Email'}
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="cold-emailing-container">
            <div className="cold-email-header">
                <h1>Cold Email Generator</h1>
                <p>Create personalized cold emails to reach out to potential employers</p>
            </div>

            <div className="step-indicator">
                <div className={`step ${step >= 1 ? 'active' : ''}`}>
                    <div className="step-number">1</div>
                    <div className="step-label">Upload Resume</div>
                </div>
                <div className="step-connector"></div>
                <div className={`step ${step >= 2 ? 'active' : ''}`}>
                    <div className="step-number">2</div>
                    <div className="step-label">Company Details</div>
                </div>
                <div className="step-connector"></div>
                <div className={`step ${step >= 3 ? 'active' : ''}`}>
                    <div className="step-number">3</div>
                    <div className="step-label">Preview & Send</div>
                </div>
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="cold-email-content">
                {renderStepContent()}
            </div>
        </div>
    );
}

export default ColdEmailing;
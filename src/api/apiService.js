// API Service for handling all backend requests
const API_URL = 'http://localhost:5000/api';

// Helper function to get auth token
const getToken = () => {
    return localStorage.getItem('token');
};

// Helper for handling fetch requests with authorization
const fetchWithAuth = async (url, options = {}) => {
    const token = getToken();

    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
    };

    const config = {
        ...options,
        headers
    };

    const response = await fetch(url, config);

    // Handle 401 Unauthorized globally
    if (response.status === 401) {
        // Clear localStorage and redirect to login
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
    }

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
    }

    return data;
};

// Jobs/Applications API
export const jobsApi = {
    // Get all job applications
    getAllJobs: async () => {
        return fetchWithAuth(`${API_URL}/jobs`);
    },

    // Get single job application
    getJob: async (id) => {
        return fetchWithAuth(`${API_URL}/jobs/${id}`);
    },

    // Create new job application
    createJob: async (jobData) => {
        return fetchWithAuth(`${API_URL}/jobs`, {
            method: 'POST',
            body: JSON.stringify(jobData)
        });
    },

    // Update job application
    updateJob: async (id, jobData) => {
        return fetchWithAuth(`${API_URL}/jobs/${id}`, {
            method: 'PUT',
            body: JSON.stringify(jobData)
        });
    },

    // Delete job application
    deleteJob: async (id) => {
        return fetchWithAuth(`${API_URL}/jobs/${id}`, {
            method: 'DELETE'
        });
    }
};

// Email API
export const emailsApi = {
    // Get all email templates
    getTemplates: async () => {
        return fetchWithAuth(`${API_URL}/emails/templates`);
    },

    // Get single email template
    getTemplate: async (id) => {
        return fetchWithAuth(`${API_URL}/emails/templates/${id}`);
    },

    // Create new template
    createTemplate: async (templateData) => {
        return fetchWithAuth(`${API_URL}/emails/templates`, {
            method: 'POST',
            body: JSON.stringify(templateData)
        });
    },

    // Update template
    updateTemplate: async (id, templateData) => {
        return fetchWithAuth(`${API_URL}/emails/templates/${id}`, {
            method: 'PUT',
            body: JSON.stringify(templateData)
        });
    },

    // Delete template
    deleteTemplate: async (id) => {
        return fetchWithAuth(`${API_URL}/emails/templates/${id}`, {
            method: 'DELETE'
        });
    },

    // Generate email from template
    generateEmail: async (templateId, jobData) => {
        return fetchWithAuth(`${API_URL}/emails/generate`, {
            method: 'POST',
            body: JSON.stringify({ templateId, jobData })
        });
    },

    // Send email
    sendEmail: async (emailData) => {
        return fetchWithAuth(`${API_URL}/emails/send`, {
            method: 'POST',
            body: JSON.stringify(emailData)
        });
    },

    // Get email stats
    getStats: async () => {
        return fetchWithAuth(`${API_URL}/emails/stats`);
    }
};

// Resume API
export const resumeApi = {
    // Upload resume
    uploadResume: async (formData) => {
        const token = getToken();

        const response = await fetch(`${API_URL}/resume/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData // Note: Don't set Content-Type for multipart/form-data
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to upload resume');
        }

        return data;
    },

    // Get user's resumes
    getResumes: async () => {
        return fetchWithAuth(`${API_URL}/resume`);
    },

    // Delete resume
    deleteResume: async (id) => {
        return fetchWithAuth(`${API_URL}/resume/${id}`, {
            method: 'DELETE'
        });
    }
};

export default {
    jobsApi,
    emailsApi,
    resumeApi
};
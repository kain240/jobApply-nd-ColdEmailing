import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000'; // Update with your backend URL

// Function to upload a resume
export const uploadResume = async (formData) => {
    const response = await axios.post(`${API_BASE_URL}/resume/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

// Function to get job listings
export const getJobListings = async () => {
    const response = await axios.get(`${API_BASE_URL}/jobs/scrape`);
    return response.data;
};

// Function to send an email
export const sendEmail = async (emailData) => {
    const response = await axios.post(`${API_BASE_URL}/email/send`, emailData);
    return response.data;
};

// Function to get resume templates
export const getResumeTemplates = async () => {
    const response = await axios.get(`${API_BASE_URL}/resume/templates`);
    return response.data;
};

// Function to authenticate user
export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
};
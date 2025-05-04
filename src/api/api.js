import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust based on your Flask backend

const api = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true, // if needed for cookies/auth
});

export default api;

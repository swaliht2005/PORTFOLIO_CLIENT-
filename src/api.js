import axios from 'axios';

// Create a new axios instance
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Your API base URL
});

// Request Interceptor: Add the token to every request if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Response Interceptor: Handle 401 errors (Invalid Token)
api.interceptors.response.use(
    (response) => response, // If response is successful, just return it
    (error) => {
        // If the error is a 401 Unauthorized
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token'); // Remove the invalid token
            window.location.href = '/admin'; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default api;
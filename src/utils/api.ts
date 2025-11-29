import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('makario_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Only redirect to login if it's an authentication error (not just missing email)
      // Check if the error message indicates authentication is required
      const errorMessage = error.response?.data?.message || '';
      const isAuthError = errorMessage.includes('Authentication required') || 
                         errorMessage.includes('Invalid or expired token') ||
                         errorMessage.includes('No token provided');
      
      if (isAuthError) {
        // Token expired or invalid - clear storage
        localStorage.removeItem('makario_token');
        localStorage.removeItem('makario_user');
        
        // Only redirect if not already on login page and not on a public page
        const currentPath = window.location.pathname;
        if (currentPath !== '/login' && currentPath !== '/signup' && !currentPath.startsWith('/admin')) {
          // Use navigate if available (React Router), otherwise use window.location
          window.location.href = '/login';
        }
      }
      // If it's just a missing email parameter, don't redirect - let the component handle it
    }
    return Promise.reject(error);
  }
);

export default api;


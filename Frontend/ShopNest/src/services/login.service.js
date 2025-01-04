import axios from 'axios';

const API_URL = process.env.BASE_URL || 'http://localhost:5000/api';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const login = async (credentials) => {
  try {
    const response = await axiosInstance.post('/login', credentials);
    
    // Store the token in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Login failed';
    console.error('Login error:', message);
    throw new Error(message);
  }
};

export const signup = async (credentials) => {
  try {
    const response = await axiosInstance.post('/signup', credentials);
    
    // Store the token in localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }

    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || 'Signup failed';
    console.error('Signup error:', message);
    throw new Error(message);
  }
};

// Utility function to check if user is logged in
export const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Utility function to get the auth token
export const getToken = () => {
  return localStorage.getItem('token');
};

// Utility function to logout
export const logout = () => {
  localStorage.removeItem('token');
};

// Add auth token to all future requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
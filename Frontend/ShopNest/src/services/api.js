import axios from 'axios';

const api = axios.create({
    baseURL: 'https://shopnest-urg5.onrender.com/api', // adjust this to your API base URL
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',  
        'Access-Control-Allow-Origin': '*'  
      }
});

// Request interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('token');
            // You might want to redirect to login page here
        }
        return Promise.reject(error);
    }
);

export default api; 
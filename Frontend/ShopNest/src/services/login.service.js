import api from './api';

export const loginService = {
    login: async (credentials) => {
        try {
            const response = await api.post('/login', credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('userId', response.data.user.id);
            }
            console.log("gcsavjc", response.data);
            
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    signup: async (userData) => {
      
     const data = {
        ...userData,
        role: 'user'
     }
        try {
            const response = await api.post('/signup', data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    }
};

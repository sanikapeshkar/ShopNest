// const BASE_URL = env.BASE_URL || 'http://localhost:5000/api';

import api from './api';

export const getAllProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data; 
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error; 
  }
};

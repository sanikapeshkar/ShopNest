
import axios from 'axios';
import api from './api';
const BASE_URL = 'http://your-backend-api-url'; 


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
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data; // Return the product data
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error; // Re-throw error to be handled by the calling code
  }
};

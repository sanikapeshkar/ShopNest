const BASE_URL = process.env.BASE_URL || 'http://localhost:5000/api';

import axios from 'axios';

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data; 
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error; 
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data; 
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
    throw error; 
  }
};

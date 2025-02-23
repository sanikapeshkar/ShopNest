import api from "./api";

export const placeOrder=async(shippingDetails)=>{
    const userId=localStorage.getItem('userId');
    const response=await api.post(`/order/${userId}`,shippingDetails);
    return response.data;
}

export const getOrders = async() => {
    const userId = localStorage.getItem('userId'); 
    try {
      const response = await api.get(`/orders/user/${userId}`);
      console.log("response", response);
      return response.data; 
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
}
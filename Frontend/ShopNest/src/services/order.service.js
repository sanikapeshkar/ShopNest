import api from "./api";

export const placeOrder=async(shippingDetails)=>{
    const userId=localStorage.getItem('userId');
    const response=await api.post(`/order/${userId}`,shippingDetails);
    return response.data;
}
import api from "./api";

export const addToCart=async(cartData)=>{
    const userId=localStorage.getItem('userId');
    console.log(cartData,'cartData',userId);
    const response=await api.post(`/cart/${userId}/add`,cartData);
    return response.data;
}   

export const getCartItems=async()=>{
    const userId=localStorage.getItem('userId');
    const response=await api.get(`/cart/${userId}`);
    console.log(response.data,'response.data');
    return response.data.items;
}

export const removeCartItem=async(userId,productId)=>{
    const response=await api.delete(`/cart/${userId}/${productId}`);
    return response.data;
}

export const checkoutCart=async(userId)=>{
    const response=await api.post(`/cart/${userId}/checkout`);
    return response.data;
}

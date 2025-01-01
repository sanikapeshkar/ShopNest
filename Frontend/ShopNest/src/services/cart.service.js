import api from "./api";

export const addToCart=async(cartData,userId)=>{
    console.log(cartData,'cartData',userId);
    const response=await api.post(`/cart/${userId}/add`,cartData);
    return response.data;
}   
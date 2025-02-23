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
    console.log(response.data,'response.data cart service');
    return response.data.items;
}

export const removeCartItem=async(productId)=>{
    
    const userId=localStorage.getItem('userId');
    const response=await api.delete(`/cart/${userId}/remove/${productId}`);
    return response.data;
}

export const checkoutCart=async(userId)=>{
    const response=await api.post(`/cart/${userId}/checkout`);
    return response.data;
}


export const updateQuantity = async (itemId, action) => {
    console.log(itemId)
    try {
      const actionitem = {
        action: action === 1 ? 'increment' : 'decrement',
      };
  
      const userId = localStorage.getItem('userId');
      if (!userId) {
        throw new Error('User ID not found in localStorage');
      }
  
      const response = await api.put(`/cart/${userId}/update/${itemId}`, actionitem);
  
      if (response.status === 200) {
        await getCartItems();
      } else {
        console.error('Failed to update cart quantity:', response.data.message);
      }
    } catch (error) {
      console.error('Error updating cart quantity:', error.message);
    }
  };
  
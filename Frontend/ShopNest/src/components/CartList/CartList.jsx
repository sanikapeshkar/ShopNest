// CartList.jsx

import React, { useState } from 'react';
import CartItem from './CartItem';

const CartList = () => {
  // Sample cart data
  const initialCartItems = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 49.99,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      name: 'Smartphone Case',
      price: 19.99,
      image: 'https://via.placeholder.com/100',
    },
    // Add more items as needed
  ];

  const [cartItems, setCartItems] = useState(initialCartItems);

  // Handle cancel order
  const handleCancel = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  // Handle return order
  const handleReturn = (itemId) => {
    // Logic to return the order can go here
    console.log(`Returning order with id: ${itemId}`);
    // Optionally, update the state to reflect the change (like removing the item, etc.)
  };

  return (
    <div className="cart-list">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onCancel={handleCancel}
            onReturn={handleReturn}
          />
        ))
      )}
    </div>
  );
};

export default CartList;

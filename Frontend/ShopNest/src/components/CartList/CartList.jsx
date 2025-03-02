
import React, { useState } from 'react';
import CartItem from './CartItem';

const CartList = () => {
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

  ];

  const [cartItems, setCartItems] = useState(initialCartItems);


  const handleCancel = (itemId) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
  };

  const handleReturn = (itemId) => {
    console.log(`Returning order with id: ${itemId}`);
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

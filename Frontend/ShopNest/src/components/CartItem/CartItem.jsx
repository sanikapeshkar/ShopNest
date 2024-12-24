// CartItem.jsx

import React from 'react';

const CartItem = ({ item, onCancel, onReturn }) => {
  const { name, price, image } = item;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={image} alt={name} />
      </div>
      <div className="cart-item-details">
        <h4>{name}</h4>
        <p>Price: ${price}</p>
      </div>
      <div className="cart-item-actions">
        <button onClick={() => onCancel(item.id)} className="cancel-button">
          Cancel
        </button>
        <button onClick={() => onReturn(item.id)} className="return-button">
          Return Order
        </button>
      </div>
    </div>
  );
};

export default CartItem;

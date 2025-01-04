import React, { useState } from 'react';
import './Profile.css';

interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  quantity: number;
}

const Profile = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Product Name",
      price: 79.99,
      originalPrice: 99.99,
      discount: 20,
      image: "path/to/image.jpg",
      quantity: 1
    },
    // Add more items as needed
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="profile-page">
        <div className="cart-empty">
          <h2>Your cart is empty</h2>
          <p>Add items to your cart to see them here</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1 className="profile-title">Your Shopping Cart</h1>
      </header>

      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
              <div>
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
                <p className="cart-item-original-price">
                  ${item.originalPrice.toFixed(2)}
                </p>
                <p className="cart-item-discount">{item.discount}% OFF</p>
              </div>
              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <h2 className="summary-title">Order Summary</h2>
        <div className="summary-row">
          <span>Subtotal</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div className="summary-total">
          <span>Total</span>
          <span>${calculateTotal().toFixed(2)}</span>
        </div>
        <button className="checkout-btn">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Profile;

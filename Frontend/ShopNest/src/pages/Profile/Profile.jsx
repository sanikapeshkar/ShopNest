import React, { useEffect, useState } from 'react';
import './Profile.css';
import { getCartItems, removeCartItem, updateQuantity } from '../../services/cart.service';
import OrderPopup from '../../components/OrderPopup/OrderPopup';
import Loader from '../../components/Loader/Loader';

const Profile = ({ setShowProfile,calculateTotal,handleCheckout }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const cartItems = await getCartItems();
      setCartItems(cartItems || []);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const removeItem = async (id) => {
    await removeCartItem(id);
    fetchCartItems();
  };

  const handleQuantityChange = async (id, amount) => {
    await updateQuantity(id, amount);
    fetchCartItems();
  };


  if (loading) {
    return (
      <div className="profile-page">
        <h3>Loading...</h3>
      </div>
    );
  }

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

    <>
      <div className="profile-page">
        <header className="profile-header">
          <h1 className="profile-title">Your Shopping Cart</h1>
        </header>

        <div className="cart-items">
          {cartItems.map((item) => (
            item?.productId && (
              <div key={item.productId._id} className="cart-item">
                <img src={item.productId.image} alt={item.productId.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <div className='cart-item-details-info'>
                    <h3 className="cart-item-name">{item.productId.name}</h3>
                    <p className="cart-item-price">${item.productId.price.toFixed(2)}</p>
                    <p className="cart-item-original-price">${item.productId.originalPrice.toFixed(2)}</p>
                    <p className="cart-item-discount">{item.productId.discount}% OFF</p>
                  </div>
                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button className="quantity-btn" onClick={() => handleQuantityChange(item._id, -1)}>-</button>
                      <span className="quantity-value">{item.quantity}</span>
                      <button className="quantity-btn" onClick={() => handleQuantityChange(item._id, 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeItem(item._id)}>Remove</button>
                  </div>
                </div>
              </div>
            )
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
            <span>${calculateTotal(cartItems).toFixed(2)}</span>
          </div>
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>

      </div>

    </>
  );
};

export default Profile;

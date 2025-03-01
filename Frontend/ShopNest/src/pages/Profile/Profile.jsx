import React, { useEffect, useState } from 'react';
import './Profile.css';
import { getCartItems, removeCartItem, updateQuantity } from '../../services/cart.service';
import OrderPopup from '../../components/OrderPopup/OrderPopup';
import { Loader } from '../../components/Loader/Loader';

const Profile = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);
  const [isCartVisible, setIsCartVisible] = useState(true);
  const [loading, setLoading] = useState(true); 

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const cartItems = await getCartItems();
      setCartItems(cartItems);
    } catch (error) {
      console.error("Failed to fetch cart items:", error);
    }
    setLoading(false); 
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.productId?.price * item?.quantity), 0);
  };

  const handleCheckout = () => {
    setIsOrderPopupOpen(true);
    setIsCartVisible(false);
  };

  if (loading) {
    return (
   <Loader/>
    );
  }

  if (cartItems.length === 0 && isCartVisible) {
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

      {isCartVisible && (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.productId?._id} className="cart-item">
              <img src={item.productId?.image} alt={item.productId?.name} className="cart-item-image" />
              <div className="cart-item-details">
                <div>
                  <h3 className="cart-item-name">{item.productId?.name}</h3>
                  <p className="cart-item-price">${item.productId?.price.toFixed(2)}</p>
                  <p className="cart-item-original-price">${item.productId?.originalPrice.toFixed(2)}</p>
                  <p className="cart-item-discount">{item.productId?.discount}% OFF</p>
                </div>
                <div className="cart-item-actions">
                  <div className="quantity-controls">
                    <button className="quantity-btn" onClick={() => {
                      updateQuantity(item?._id, -1);
                      fetchCartItems();
                    }}>
                      -
                    </button>
                    <span className="quantity-value">{item?.quantity}</span>
                    <button className="quantity-btn" onClick={() => {
                      updateQuantity(item?._id, 1);
                      fetchCartItems();
                    }}>
                      +
                    </button>
                  </div>
                  <button className="remove-btn" onClick={() => {
                    removeCartItem(item?._id);
                    fetchCartItems();
                  }}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isCartVisible && (
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
          <button className="checkout-btn" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}

      {isOrderPopupOpen && (
        <OrderPopup
          onClose={() => {
            setIsOrderPopupOpen(false);
            setIsCartVisible(true);
          }}
          onSubmit={handleCheckout}
          total={calculateTotal()}
        />
      )}
    </div>
  );
};

export default Profile;

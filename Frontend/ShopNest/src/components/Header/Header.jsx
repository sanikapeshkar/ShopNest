import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const CartIcon = () => (
  <svg 
    className="cart-icon" 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

const Header = ({
  isAuthenticated,
  isAdmin,
  onLogout,
  onLogin,
  onCartClick,
  onProfileClick,
  onSearchProducts
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [showCart, setShowCart] = useState(false);
  // const [showOrderHistory, setShowOrderHistory] = useState(false);

  const displayCart = () => {
    // setShowCart(true);
    onCartClick();
  }; 

  const displayProfile = () => {
    // setShowOrderHistory(true); 
    onProfileClick(); 
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchProducts(value);
  };

  return (
    <header className="header">
      <div className="header-logo">
        <h1 className="logo">ShopNest</h1>
      </div>
      
      <div className="header-search">
        <input
          type="text"
          placeholder="Search products..."
          className="header-search-input"
          aria-label="Search products"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      
      <div className="header-actions">
        {!isAuthenticated ? (
          <>
            <button onClick={displayCart}>
              <CartIcon /> Cart
            </button>
            <button onClick={onLogin}>Login</button>
          </>
        ) : (
          <>
            <button onClick={displayCart}>
              <CartIcon /> Cart
            </button>
            { isAdmin !== 'admin' && <button onClick={displayProfile}>Profile</button> }
            <button onClick={onLogout}>Logout</button>
          </>
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  onLogout: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onCartClick: PropTypes.func.isRequired,
  onSearchProducts: PropTypes.func.isRequired,
};

export default Header;
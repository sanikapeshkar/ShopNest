import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import Button from '../Button/Button';

const Header = ({ isAuthenticated, onLogout, onLogin, onSignup, onCartClick }) => {
  const [showCart, setShowCart] = useState(false);

  const displayCart = () => {
    setShowCart(true);
    onCartClick();
  };

  return (
    <header className="header">
      <div className="header-logo">
        <h1 className="logo">ShopNest</h1>
      </div>
      <div className="header-search">
        <input
          type="text"
          placeholder="Search..."
          className="header-search-input"
        />
      </div>
      <div className="header-actions">
        {!isAuthenticated ? (
          <>
            <Button buttonType="default" onClick={displayCart}>
              Cart
            </Button>
            <Button buttonType="default" onClick={onLogin}>
              Login
            </Button>
          </>
        ) : (
          <>
            <Button buttonType="default" onClick={displayCart}>
              Cart
            </Button>
            <Button buttonType="danger" onClick={onLogout}>
              Logout
            </Button>
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
  onSignup: PropTypes.func.isRequired,
  onCartClick: PropTypes.func.isRequired,
};

export default Header;

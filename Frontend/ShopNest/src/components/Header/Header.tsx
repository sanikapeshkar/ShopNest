import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import Button from '../Button/Button';

const Header = ({ onLogout, onAddToCart }) => {
  const handleLogout = () => {
    onLogout();
  };

  const handleAddToCart = () => {
    onAddToCart();
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
        <Button buttonType="default" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button buttonType="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  );
};

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default Header;

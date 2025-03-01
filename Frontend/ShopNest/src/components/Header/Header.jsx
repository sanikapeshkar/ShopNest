import React, { useState } from "react";
import PropTypes from "prop-types";
import "./Header.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaShoppingCart } from "react-icons/fa";

const CartIcon = () => <FaShoppingCart className="cart-icon" />;

const Header = ({
  isAuthenticated,
  isAdmin,
  onLogout,
  onLogin,
  onCartClick,
  onProfileClick,
  onSearchProducts,
  userName
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchProducts(value);
  };

  const getRandomColor = () => {
    const colors = ["#E0BBE4", "#D291BC", "#F3C1C6", "#FFC3A0", "#FFD5E5", "#C3B1E1", "#E6E6FA"];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  

  const handleLogoutClick = () => {
    setShowPopup(true);
  };

  const confirmLogout = () => {
    onLogout();
    setShowPopup(false);
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
            <button onClick={onCartClick}>
              <CartIcon /> Cart
            </button>
            <button onClick={onLogin}>Login</button>
          </>
        ) : (
          <>
            {isAdmin !== "admin" && (
              <button onClick={onCartClick} className="header-button">
                <CartIcon /> Cart
              </button>
            )}

            {isAdmin !== "admin" ? (
              <div className="profile-dropdown-container">
                <button className="profile-button" onClick={toggleDropdown}>
                  {userName ? (
                    <div
                      className="profile-initial"
                      style={{ backgroundColor: getRandomColor() }} // Set random color
                    >
                      {userName.charAt(0).toUpperCase()}
                    </div>
                  ) : (
                    <FaUser className="profile-icon" size={20} />
                  )}
                </button>
                {showDropdown && (
                  <div className="dropdown-menu">
                    <button onClick={onProfileClick}>Profile</button>
                    <button onClick={handleLogoutClick}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <button onClick={handleLogoutClick}>Logout</button>
            )}

          </>
        )}
      </div>
      {showPopup && <LogoutPopup onConfirm={confirmLogout} onCancel={() => setShowPopup(false)} />}
    </header>
  );
};

const LogoutPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="logout-overlay">
      <div className="logout-popup">
        <p>Are you sure you want to logout?</p>
        <div className="logout-buttons">
          <button className="confirm-btn" onClick={onConfirm}>Yes</button>
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
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

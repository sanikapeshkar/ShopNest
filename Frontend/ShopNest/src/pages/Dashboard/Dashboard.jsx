// Dashboard.jsx
import React, { useContext, useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import './Dashboard.css';
import data from '../../dummyData/ProductListData';
import Header from '../../components/Header/Header';
import Login from '../Login/Login';
import Signup from '../Login/Signup';
import Profile from '../Profile/Profile';
import { AuthContext } from './AuthContext';

const Dashboard = () => {
  const { isAuthenticated, loginPopup, setLoginPopup } = useContext(AuthContext);
  const [signupPopup, setSignupPopup] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleSignup = () => {
    setSignupPopup(true);
    setLoginPopup(false);
  };

  const closeSignupPopup = () => {
    setSignupPopup(false);
  };

  const onSignupSuccess = () => {
    setSignupPopup(false);
  };

  const handleCartClick = () => {
    setShowProfile(true);
  };

  const closeProfile = () => {
    setShowProfile(false);
  };

  return (
    <div className="app-container">
      <Header
        isAuthenticated={isAuthenticated}
        onLogin={() => setLoginPopup(true)}
        onLogout={() => setIsAuthenticated(false)}
        onCartClick={handleCartClick}
      />
      <main className="main-content">
        <ProductList products={data} />
      </main>

      {/* Login Popup */}
      {loginPopup && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setLoginPopup(false)}>
              ×
            </button>
            <Login 
              onLoginSuccess={() => setLoginPopup(false)} 
              showSignupPopup={() => {
                setLoginPopup(false);
                setSignupPopup(true);
              }} 
            />
          </div>
        </div>
      )}

      {/* Signup Popup */}
      {signupPopup && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeSignupPopup}>
              ×
            </button>
            <Signup 
              onSignupSuccess={onSignupSuccess} 
              showLoginPopup={() => {
                setSignupPopup(false);
                setLoginPopup(true);
              }} 
            />
          </div>
        </div>
      )}

      {/* Profile Popup */}
      {showProfile && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeProfile}>
              ×
            </button>
            <Profile />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

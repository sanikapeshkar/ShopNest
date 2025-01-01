// Dashboard.jsx
import React, { useContext, useState } from 'react';
import ProductList from '../../components/ProductList/ProductList';
import './Dashboard.css';
import data from '../../dummyData/ProductListData';
import Header from '../../components/Header/Header';
import Login from '../Login/Login';
import Signup from '../Login/Signup';
import { AuthContext } from './AuthContext';

const Dashboard = () => {
  const { isAuthenticated, loginPopup, setLoginPopup } = useContext(AuthContext);
  const [signupPopup, setSignupPopup] = useState(false);

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

  return (
    <div className="dashboard">
      <Header
        isAuthenticated={isAuthenticated}
        onLogin={() => setLoginPopup(true)}
        onLogout={() => setIsAuthenticated(false)}
        onSignup={handleSignup}
      />
      <main className="dashboard-main">
        <ProductList products={data} />
      </main>

      {/* Login Popup */}
      {loginPopup && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setLoginPopup(false)}>
              ×
            </button>
            <Login onLoginSuccess={() => setLoginPopup(false)} showSignupPopup={handleSignup} />
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
            <Signup onSignupSuccess={onSignupSuccess} showLoginPopup={() => setLoginPopup(true)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

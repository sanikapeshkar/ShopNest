// Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import ProductList from "../../components/ProductList/ProductList";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import "./Dashboard.css";
import Header from "../../components/Header/Header";
import Login from "../Login/Login";
import Signup from "../Login/Signup";
import Profile from '../Profile/Profile';
import { AuthContext } from "../Login/AuthContext";
import { getAllProducts } from "../../services/products.service";

const Dashboard = () => {
  const { isAuthenticated,setIsAuthenticated, loginPopup, setLoginPopup, userRole } =
    useContext(AuthContext);
  const [signupPopup, setSignupPopup] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allproducts = await getAllProducts();
      setProducts(allproducts);
    };
    fetchProducts();
  }, []);
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
      <main className="dashboard-main">
        {userRole === 'admin' ? (
          <AdminDashboard />
        ) : (
          <ProductList products={products} />
        )}
      </main>

      {/* Login Popup */}
      {loginPopup && (
        <div className="modal">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={() => setLoginPopup(false)}
            >
              ×
            </button>
            <Login
              onLoginSuccess={() => setLoginPopup(false)}
              showSignupPopup={handleSignup}
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

      {/* Profile Popup
      {showProfile && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeProfile}>
              ×
            </button>
            <Profile />
          </div>
        </div>
      )} */}

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

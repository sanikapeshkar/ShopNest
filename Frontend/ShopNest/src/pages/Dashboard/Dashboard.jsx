// Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import ProductList from "../../components/ProductList/ProductList";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import "./Dashboard.css";
import Header from "../../components/Header/Header";
import Login from "../Login/Login";
import Signup from "../Login/Signup";
import Profile from '../Profile/Profile';
import { AuthContext, AuthProvider, useAuthProvider } from "../Login/AuthContext";
import { getAllProducts } from "../../services/products.service";
import OrderHistory from "../../components/OrderHistory/OrderHistory";

const Dashboard = () => {
  const { isAuthenticated, setIsAuthenticated, loginPopup, setLoginPopup, userRole } =
    useContext(AuthContext);

  console.log(isAuthenticated, setIsAuthenticated, loginPopup, setLoginPopup, userRole, 'got the context');

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
  const [showOrderHistory, setShowOrderHistory] = useState(false);

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
    console.log("ghdcdhvewjhcbwej");
    setShowProfile(false);
  };


  const displayProfile = () => {
    setShowOrderHistory(true)
  };
  const closeDisplayHistory = () => {
    console.log("ghdcdhvewj", showOrderHistory);
    
    setShowOrderHistory(false)
  }
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearchProducts = (searchTerm) => {
    console.log("serachTerm", searchTerm);

    if (!searchTerm) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  };
  return (

    <div className="app-container">
      <Header
        isAuthenticated={isAuthenticated}
        isAdmin={userRole}
        onLogin={() => setLoginPopup(true)}
        onLogout={() => setIsAuthenticated(false)}
        onCartClick={handleCartClick}
        onProfileClick={displayProfile}
        onSearchProducts={handleSearchProducts}
      />
      <main className="dashboard-main">
        {userRole === 'admin' ? (
          <AdminDashboard />
        ) : (
          <ProductList
            products={filteredProducts.length > 0 ? filteredProducts : products}
          />
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

      {showOrderHistory && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={closeDisplayHistory}>
              ×
            </button>
            <OrderHistory />
          </div>
        </div>
      )}
    </div>

  );
};

export default useAuthProvider(Dashboard);

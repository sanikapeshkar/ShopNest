// Dashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import ProductList from "../../components/ProductList/ProductList";
import "./Dashboard.css";
import Header from "../../components/Header/Header";
import Login from "../Login/Login";
import Signup from "../Login/Signup";
import { AuthContext } from "../Login/AuthContext";
import { getAllProducts } from "../../services/products.service";

const Dashboard = () => {
  const { isAuthenticated,setIsAuthenticated, loginPopup, setLoginPopup } =
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
        <ProductList products={products} />
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
              showLoginPopup={() => setLoginPopup(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

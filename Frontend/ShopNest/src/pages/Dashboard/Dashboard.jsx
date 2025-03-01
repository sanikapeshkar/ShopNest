import React, { useContext, useEffect, useState } from "react";
import ProductList from "../../components/ProductList/ProductList";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import Header from "../../components/Header/Header";
import Login from "../Login/Login";
import Signup from "../Login/Signup";
import Profile from "../Profile/Profile";
import OrderHistory from "../../components/OrderHistory/OrderHistory";
import { AuthContext, useAuthProvider } from "../Login/AuthContext";
import { getAllProducts } from "../../services/products.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Dashboard.css";

const Dashboard = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    loginPopup,
    setLoginPopup,
    userRole,
    setUserRole,
  } = useContext(AuthContext);

  const [signupPopup, setSignupPopup] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [showOrderHistory, setShowOrderHistory] = useState(false);
  const [userDetails, setuserDetails] = useState({});
  // Fetch all products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
      } catch (error) {
        toast.error("Failed to fetch products.");
      }
    };
    fetchProducts();
  }, []);

  const handleSignup = () => {
    setSignupPopup(true);
    setLoginPopup(false);
  };

  const closeSignupPopup = () => setSignupPopup(false);

  const onSignupSuccess = () => {
    setSignupPopup(false);
    toast.success("Signup successful! Please log in.");
  };

  const handleLoginSuccess = () => {
    setLoginPopup(false);
    toast.success("Login successful!");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    toast.info("Logged out successfully.");
  };

  const handleProfileClick = () => setShowProfile(true);
  const closeProfile = () => setShowProfile(false);

  const displayOrderHistory = () => setShowOrderHistory(true);
  const closeOrderHistory = () => setShowOrderHistory(false);

  const handleSearchProducts = (searchTerm) => {
    if (!searchTerm) {
      setFilteredProducts(products);
      toast.info("Showing all products.");
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);

      if (filtered.length > 0) {
        toast.success(`Found ${filtered.length} matching products.`);
      } else {
        toast.warning("No matching products found.");
      }
    }
  };

  return (
    <div className="app-container">
      <Header
        isAuthenticated={isAuthenticated}
        isAdmin={userRole}
        onLogin={() => setLoginPopup(true)}
        onLogout={handleLogout}
        onCartClick={handleProfileClick}
        onProfileClick={displayOrderHistory}
        onSearchProducts={handleSearchProducts}
      />

      <main className="dashboard-main">
        {userRole === "admin" ? (
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
            <button className="close-button" onClick={() => setLoginPopup(false)}>
              ×
            </button>
            <Login onLoginSuccess={handleLoginSuccess} showSignupPopup={handleSignup} handlesetUserData={setuserDetails}/>
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
        <OrderHistory userData={userDetails} closeOrderHistory={closeOrderHistory}/>
      )}
    </div>
  );
};

export default useAuthProvider(Dashboard);

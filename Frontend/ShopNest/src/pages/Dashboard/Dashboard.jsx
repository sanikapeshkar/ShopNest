import React, { useContext, useEffect, useState, useRef } from "react";
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
import { debounce } from "lodash";
import OrderPopup from "../../components/OrderPopup/OrderPopup";

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
  const [userDetails, setUserDetails] = useState({});

  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
        setFilteredProducts(allProducts);
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

  
  const calculateTotal = (cartItems) => {
    if (!Array.isArray(cartItems)) {
      console.error("cartItems is not an array:", cartItems);
      return 0; 
    }
  
    return cartItems.reduce((total, item) => {
      const price = item?.productId?.price || 0;
      const quantity = item?.quantity || 0;
      return total + price * quantity;
    }, 0);
  }

  const handleCheckout = () => {
     setShowProfile(false);
    setIsOrderPopupOpen(true);

  };
  const debouncedSearch = useRef(
    debounce((searchTerm, products) => {
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
    }, 500)
  ).current;

  const handleSearchProducts = (searchTerm) => {
    debouncedSearch(searchTerm, products);
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
        userName={userDetails.name}
      />

      <main className="dashboard-main">
        {userRole === "admin" ? (
          <AdminDashboard products={filteredProducts} setProducts={setProducts} />
        ) : (
          <ProductList products={filteredProducts} />
        )}
      </main>

      {loginPopup && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setLoginPopup(false)}>
              ×
            </button>
            <Login onLoginSuccess={handleLoginSuccess} showSignupPopup={handleSignup} handlesetUserData={setUserDetails} />
          </div>
        </div>
      )}

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
            <Profile  calculateTotal={calculateTotal} handleCheckout={handleCheckout} products={products}/>
          </div>
        </div>
      )}
      
      {isOrderPopupOpen && (
        <OrderPopup
          onClose={() => {
            setIsOrderPopupOpen(false);
          }}
          onSubmit={handleCheckout}
          total={calculateTotal()}
        />
      )}

      {showOrderHistory && (
        <OrderHistory userData={userDetails} closeOrderHistory={closeOrderHistory} />
      )}
    </div>
  );
};

export default useAuthProvider(Dashboard);

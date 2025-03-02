import React, { useState, useEffect } from 'react';
import './OrderHistory.css';
import { getOrders } from '../../services/order.service';
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const OrderHistory = ({ userData, closeOrderHistory }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const getPaymentStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return { color: "green", icon: <FaCheckCircle /> };
      case "pending":
        return { color: "orange", icon: <FaClock /> };
      case "failed":
        return { color: "red", icon: <FaTimesCircle /> };
      default:
        return { color: "black", icon: null };
    }
  };
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        setIsLoading(true);
        const ordersData = await getOrders();
        setOrders(ordersData);
      } catch (err) {
        setError(err);
      }
      setIsLoading(false);
    };

    fetchOrderHistory();
  }, []);


  console.log(userData);
  return (
    <div className="order-modal">
      <div className="order-content">
        <button className="close-button" onClick={closeOrderHistory}>
          ×
        </button>
        <div className="order-history-container">
          <div className="profile-card">
            {userData?.profileImage ? (
              <img src={userData.profileImage} alt={userData?.name || "User"} className="profile-image" />
            ) : (
              <div className="profile-placeholder">
                {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
              </div>
            )}
            <div className="profile-details">
              <h3>{userData?.name || "Unknown User"}</h3>
              <p>{userData?.email || "No email available"}</p>
            </div>
          </div>


          <div className="order-history-overlay">
            <div className="order-history-modal">
              <div className="order-history-header">
                <h2>Order History</h2>
              </div>

              <div className="order-history-content">
                {isLoading && <p>Loading orders...</p>}
                {error && <p>No orders</p>}
                {!isLoading && orders.length === 0 && <p>No orders found.</p>}

                {orders?.map((order) => (
                  <div key={order._id} className="order-item">
                    <div className="order-header">
                      <span>Order ID: {order._id}</span>
                      <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="order-details">
                      <p className="order-amount"><strong>Total Amount:</strong> <span>${order.totalAmount}</span></p>

                      <p className="order-status">
                        <strong>Status:</strong>
                        <span className={`status-label ${order.orderStatus.toLowerCase()}`}>{order.orderStatus}</span>
                      </p>

                      <p className="payment-status">
                        <strong>Payment Status:</strong>
                        <span className={`payment-label ${order.paymentStatus.toLowerCase()}`} style={{ color: getPaymentStatusStyle(order.paymentStatus).color }}>
                          {getPaymentStatusStyle(order.paymentStatus).icon} {order.paymentStatus}
                        </span>
                      </p>
                    </div>

                    <div className="order-products">
                      {order.products?.map((product, index) => (
                        <div key={index} className="product-item">
                          <span>{product.name}</span>
                          <span>Quantity: {product.quantity}</span>
                          <span>Price: ${product.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;

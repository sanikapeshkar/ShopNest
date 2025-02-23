import React, { useState, useEffect } from 'react';
import './OrderHistory.css';
import { getOrders } from '../../services/order.service';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        setIsLoading(true);
        const ordersData = await getOrders();
        setOrders(ordersData);
        setIsLoading(false);
      } catch (err) {
        setError(err);
        setIsLoading(false);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
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
                <p>Total Amount: ${order.totalAmount}</p>
                <p>Status: {order.orderStatus}</p>
                <p>Payment Status: {order.paymentStatus}</p>
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
  );
};

export default OrderHistory;
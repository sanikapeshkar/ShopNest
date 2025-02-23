import React, { useState } from "react";
import "./OrderPopup.css";
import { placeOrder } from "../../services/order.service";
import Button from '../Button/Button'

const paymentMethods = [
  { id: "credit", label: "Credit Card" },
  { id: "debit", label: "Debit Card" },
  { id: "cod", label: "Cash on Delivery" },
  { id: "paypal", label: "PayPal" },
];

const OrderPopup = ({ onClose, onSubmit, total }) => {
  const [shippingDetails, setShippingDetails] = useState({
    shippingAddress: "",
    paymentMethod: "",
  });
  const handlePlaceOrder = async () => {
    await placeOrder(shippingDetails);  
    onClose();
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(shippingDetails);
  };

  return (
    <div className="order-popup-overlay">
      <div className="order-popup">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Complete Your Order</h2>
        <p className="total-amount">Total Amount: ${total}</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="address"> Address</label>
            <input
              type="text"
              id="address"
              name="shippingAddress"
              value={shippingDetails.shippingAddress}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method</label>
            <select
              id="paymentMethod"
              name="paymentMethod"
              value={shippingDetails.paymentMethod}
              onChange={handleChange}
              required
            >
              <option value="">Select Payment Method</option>
              {paymentMethods.map((method) => (
                <option key={method.id} value={method.label}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>

          <div className="button-group">
            <Button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="submit-button" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderPopup;

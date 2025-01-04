// Login.jsx
import React, { useState } from 'react';
import './Login.css';
import { FiMail, FiLock } from 'react-icons/fi';

const Login = ({ onLoginSuccess, showSignupPopup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your login logic here
  };

  return (
    <div className="auth-modal">
      <div className="auth-header">
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to continue shopping</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="email">
            <FiMail className="input-icon" /> Email
          </label>
          <div className="input-container">
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="password">
            <FiLock className="input-icon" /> Password
          </label>
          <div className="input-container">
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="forgot-password">
            <span className="auth-link">Forgot Password?</span>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="auth-button">
          Sign In
        </button>
      </form>

      <div className="auth-footer">
        Don't have an account?
        <span className="auth-link" onClick={showSignupPopup}>
          Sign Up
        </span>
      </div>
    </div>
  );
};

export default Login;

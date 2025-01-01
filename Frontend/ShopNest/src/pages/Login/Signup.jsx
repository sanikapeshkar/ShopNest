import React, { useState } from 'react';
import './Signup.css'; // Import the Signup CSS file

const Signup = ({ onSignupSuccess, showLoginPopup }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your actual signup logic
      const userData = await signup(formData);
      console.log('Signup successful:', userData);
      onSignupSuccess();
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div>
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div>
          <label>Password</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>

      <p>
        Already have an account?{' '}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            showLoginPopup();
          }}
        >
          Login here
        </a>
      </p>
    </div>
  );
};

export default Signup;

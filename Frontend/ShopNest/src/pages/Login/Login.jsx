
import React, { useContext, useState } from 'react';
import './Login.css'; 
import { loginService } from '../../services/login.service';
import { AuthContext } from './AuthContext';

const Login = ({ onLoginSuccess, showSignupPopup }) => {
  const { setIsAuthenticated, setUserId } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials,'credentials');
    try {
      const userData = await loginService.login(credentials);
      setIsAuthenticated(true);
      setUserId(userData.user.id);
      console.log('Login successful:', userData);
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?  <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            showSignupPopup();
          }}
        >Sign up here</a>
      </p>
    </div>
  );
};

export default Login;

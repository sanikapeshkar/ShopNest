import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize state from localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const [loginPopup, setLoginPopup] = useState(false);
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'user');

  // Sync state changes to localStorage
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('userRole', userRole);
  }, [userRole]);

  const value = {
    isAuthenticated,
    setIsAuthenticated,
    loginPopup,
    setLoginPopup,
    userRole,
    setUserRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Higher-order component to wrap components with AuthProvider
export const useAuthProvider = (Component) => {
  return () => (
    <AuthProvider>
      <Component />
    </AuthProvider>
  );
};

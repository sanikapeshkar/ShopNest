import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);
  const [userRole, setUserRole] = useState('user');

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

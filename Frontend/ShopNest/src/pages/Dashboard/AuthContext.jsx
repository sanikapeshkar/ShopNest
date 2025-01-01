import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value) => {}, // Accepts a boolean value
  loginPopup: false,
  setLoginPopup: (value) => {}, // Accepts a boolean value
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loginPopup,
        setLoginPopup,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

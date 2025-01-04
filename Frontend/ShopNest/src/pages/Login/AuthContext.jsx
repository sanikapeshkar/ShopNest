import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  isAuthenticated: localStorage.getItem('token') ? true : false,
  setIsAuthenticated: (value) => {},
  loginPopup: false,
  setLoginPopup: (value) => {}, 
  userId: localStorage.getItem('userId') || null,
  setUserId: (value) => {}, 
});

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState( localStorage.getItem('token') ? true : false);
  const [loginPopup, setLoginPopup] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
 
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        loginPopup,
        setLoginPopup,
        userId,
        setUserId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

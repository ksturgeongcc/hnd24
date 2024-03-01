// AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = (token, isAdmin) => {
    
    setIsAuthenticated(true);
    setIsAdmin(isAdmin);
    // You may want to save the token to local storage here
    console.log(isAuthenticated);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    // Clear the token from local storage here
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

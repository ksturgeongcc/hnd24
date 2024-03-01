// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ element, allowedRoles }) => {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated) {
    // Redirect to login if the user is not authenticated
    return <Navigate to="/login" />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(isAdmin ? 'admin' : 'user')) {
    // Redirect to unauthorized page if user's role doesn't match the allowed roles
    return <Navigate to="/unauthorized" />;
  }

  // Render the protected route if the user is authenticated and has the required role
  return <Route element={element} />;
};

export default PrivateRoute;

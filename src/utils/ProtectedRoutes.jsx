import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Root from '../pages/Root';

const ProtectedRoute = ({ ...props }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? <Root /> : <Navigate to="/login" />;
};

export default ProtectedRoute;

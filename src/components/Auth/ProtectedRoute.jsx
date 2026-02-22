import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { hasRole, isAllowed } from '../../utils/auth';

const ProtectedRoute = ({ 
  children, 
  requiredRoles = [], 
  requiredRights = [],
  redirectPath = '/login' 
}) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated || !user) {
    return <Navigate to={redirectPath} replace />;
  }

  if (requiredRoles.length > 0 && !hasRole(user, requiredRoles)) {
    return <Navigate to="/unauthorized" replace />;
  }
  if (requiredRights.length > 0 && !isAllowed(user, requiredRights)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
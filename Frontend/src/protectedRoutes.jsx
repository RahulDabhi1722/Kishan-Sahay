import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './authContext';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { currentUser, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    // Redirect to appropriate dashboard based on role
    if (currentUser.role === 'farmer') {
      return <Navigate to="/farmer-dashboard" />;
    } else if (currentUser.role === 'customer') {
      return <Navigate to="/customer-dashboard" />;
    } else if (currentUser.role === 'admin') {
      return <Navigate to="/admin-dashboard" />;
    }
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
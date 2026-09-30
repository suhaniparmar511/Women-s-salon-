import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCustomer } from '../../context/CustomerContext';

export const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useCustomer();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const normalizedUserRole = user.role === 'Stylist' ? 'Barber' : user.role;
    const isAllowed = allowedRoles.some(role => role === normalizedUserRole || (role === 'Barber' && user.role === 'Stylist'));

    if (!isAllowed) {
      // Redirect based on actual user role
      if (user.role === 'Barber') return <Navigate to="/barber/dashboard" replace />;
      if (user.role === 'Receptionist') return <Navigate to="/receptionist/dashboard" replace />;
      if (user.role === 'Admin') return <Navigate to="/admin/dashboard" replace />;
      return <Navigate to="/customer/dashboard" replace />;
    }
  }

  return <Outlet />;
};

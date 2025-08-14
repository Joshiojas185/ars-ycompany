import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

interface ProtectedRouteProps {
  roles?: Array<'customer' | 'administrator' | 'content_administrator' | 'tenant_employee'>;
  children: React.ReactElement;
}

export function ProtectedRoute({ roles, children }: ProtectedRouteProps) {
  const { state } = useApp();

  if (!state.currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(state.currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

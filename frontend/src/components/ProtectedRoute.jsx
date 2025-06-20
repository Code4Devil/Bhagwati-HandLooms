import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    // You can render a loading spinner or skeleton here while Clerk loads
    return <div>Loading authentication...</div>;
  }

  if (!isSignedIn) {
    // User is not signed in, redirect to home or login page
    return <Navigate to="/" replace />;
  }

  // Check if user has any of the allowed roles
  const userRole = user.publicMetadata?.role;
  const hasRequiredRole = allowedRoles.includes(userRole);

  if (!hasRequiredRole) {
    // User does not have the required role, redirect to home or a forbidden page
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
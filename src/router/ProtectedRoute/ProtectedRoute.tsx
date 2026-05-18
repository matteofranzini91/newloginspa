import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '#Hooks/useAuth';
import React from 'react';
import { ROUTES } from 'router/routes';

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { logged } = useAuth();

  if (!logged) {
    return <Navigate to={ROUTES.BASE} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

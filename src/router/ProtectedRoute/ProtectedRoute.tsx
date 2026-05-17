import type { PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '#Hooks/useAuth';

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { logged } = useAuth();

  if (!logged) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

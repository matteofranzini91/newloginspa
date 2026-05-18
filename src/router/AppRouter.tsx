import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import { useAuth } from '#Hooks/useAuth';

import PageLoader from '../components/PageLoader/PageLoader';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import { ROUTES } from './routes';

const Login = lazy(() => import('#Pages/Login/Login'));
const Welcome = lazy(() => import('#Pages/Welcome/Welcome'));

const AppRouter = () => {
  const { isLoggingIn, isLoggingOut } = useAuth();

  if (isLoggingIn || isLoggingOut) {
    return <PageLoader />;
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path={ROUTES.BASE} element={<Login />} />
        <Route path={ROUTES.REFRESH_PASSWORD} element={<Login />} />
        <Route path={ROUTES.REGISTER_USER} element={<Login />} />
        <Route
          path={ROUTES.WELCOME}
          element={
            <ProtectedRoute>
              <Welcome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;

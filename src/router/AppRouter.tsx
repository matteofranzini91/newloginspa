import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import PageLoader from './PageLoader';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';

const Login = lazy(() => import('#Pages/Login/Login'));
const Welcome = lazy(() => import('#Pages/Welcome/Welcome'));

const AppRouter = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/refresh-password" element={<Login />} />
      <Route path="/register-user" element={<Login />} />
      <Route
        path="/welcome"
        element={
          <ProtectedRoute>
            <Welcome />
          </ProtectedRoute>
        }
      />
    </Routes>
  </Suspense>
);

export default AppRouter;

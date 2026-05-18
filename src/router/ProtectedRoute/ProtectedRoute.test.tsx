import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import * as useAuthModule from '#Hooks/useAuth';

import { ROUTES } from 'router/routes';
import ProtectedRoute from './ProtectedRoute';

const mockUseAuth = (logged: boolean) =>
  vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
    logged,
    isLoggingIn: false,
    isLoggingOut: false,
    userId: logged ? 1 : null,
    login: vi.fn(),
    logout: vi.fn(),
  });

const renderWithRoutes = (initialPath: string) =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path={ROUTES.BASE} element={<div>Login Page</div>} />
        <Route
          path={ROUTES.WELCOME}
          element={
            <ProtectedRoute>
              <div>Welcome Page</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>,
  );

describe('ProtectedRoute', () => {
  it('renders children when user is logged in', () => {
    mockUseAuth(true);
    renderWithRoutes(ROUTES.WELCOME);
    expect(screen.getByText('Welcome Page')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  it('redirects to / when user is not logged in', () => {
    mockUseAuth(false);
    renderWithRoutes(ROUTES.WELCOME);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Welcome Page')).not.toBeInTheDocument();
  });
});

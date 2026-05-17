import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import * as useAuthModule from '#Hooks/useAuth';

import ProtectedRoute from './ProtectedRoute';

const mockUseAuth = (logged: boolean) =>
  vi.spyOn(useAuthModule, 'useAuth').mockReturnValue({
    logged,
    logging: false,
    userId: logged ? 1 : null,
    login: vi.fn(),
    logout: vi.fn(),
  });

const renderWithRoutes = (initialPath: string) =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/" element={<div>Login Page</div>} />
        <Route
          path="/welcome"
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
    renderWithRoutes('/welcome');
    expect(screen.getByText('Welcome Page')).toBeInTheDocument();
    expect(screen.queryByText('Login Page')).not.toBeInTheDocument();
  });

  it('redirects to / when user is not logged in', () => {
    mockUseAuth(false);
    renderWithRoutes('/welcome');
    expect(screen.getByText('Login Page')).toBeInTheDocument();
    expect(screen.queryByText('Welcome Page')).not.toBeInTheDocument();
  });
});

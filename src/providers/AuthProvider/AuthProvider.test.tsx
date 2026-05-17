import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { store } from '#Store/store';
import * as httpServiceModule from '#Services/http.service';
import { useAuth } from '#Hooks/useAuth';
import AuthProvider from './AuthProvider';

const renderWithProvider = (ui: React.ReactNode, path = '/') =>
  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>
    </Provider>,
  );

const ConsumerComponent = () => {
  const auth = useAuth();
  return (
    <div>
      <span data-testid="logged">{String(auth.logged)}</span>
      <span data-testid="logging">{String(auth.logging)}</span>
      <span data-testid="userId">{String(auth.userId)}</span>
      <button onClick={() => auth.login('user@test.com', 'pass')}>login</button>
      <button onClick={() => auth.logout()}>logout</button>
    </div>
  );
};

const Wrapped = () => (
  <AuthProvider>
    <ConsumerComponent />
  </AuthProvider>
);

describe('AuthProvider', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  it('starts as logged-out when sessionStorage is empty', () => {
    renderWithProvider(<Wrapped />);
    expect(screen.getByTestId('logged').textContent).toBe('false');
    expect(screen.getByTestId('userId').textContent).toBe('null');
  });

  it('restores logged state from sessionStorage', () => {
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('userId', '42');
    renderWithProvider(<Wrapped />);
    expect(screen.getByTestId('logged').textContent).toBe('true');
    expect(screen.getByTestId('userId').textContent).toBe('42');
  });

  it('logout clears session and token', async () => {
    sessionStorage.setItem('loggedIn', 'true');
    sessionStorage.setItem('userId', '5');
    sessionStorage.setItem('token', 'tok');

    vi.spyOn(httpServiceModule.httpService, 'post').mockResolvedValue(undefined);
    const setTokenSpy = vi.spyOn(httpServiceModule.httpService, 'setToken');

    renderWithProvider(<Wrapped />);
    await act(async () => {
      screen.getByText('logout').click();
      await new Promise((resolve) => setTimeout(resolve, 50));
    });

    expect(setTokenSpy).toHaveBeenCalledWith(null);
    expect(sessionStorage.getItem('loggedIn')).toBeNull();
    expect(screen.getByTestId('logged').textContent).toBe('false');
  });
});

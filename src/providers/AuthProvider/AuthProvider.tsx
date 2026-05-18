import type { PropsWithChildren } from 'react';
import { createContext, memo, useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { httpService } from '#Services/http.service';
import { api } from '#Store/api/api';
import { useLoginMutation, useLogoutMutation } from '#Store/api/auth.api';
import { useAppDispatch } from '#Store/hooks';

import { ROUTES } from 'router/routes';
import type { AuthContextValue } from './AuthProvider.model';
import { clearSession, readSession, writeSession } from './AuthProvider.utils';

export const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const session = readSession();
  const { loggedIn, userId: sessionUserId } = session;

  const [logged, setLogged] = useState<boolean>(loggedIn);
  const [userId, setUserId] = useState<number | null>(sessionUserId);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false);

  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  useEffect(() => {
    const { token } = readSession();
    if (token) httpService.setToken(token);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      flushSync(() => setIsLoggingIn(true));
      try {
        const res = await loginMutation({ email, password }).unwrap();
        const { token, userId: resUserId } = res;
        writeSession(token, resUserId);
        httpService.setToken(token);
        setUserId(resUserId);
        setLogged(true);
        navigate(ROUTES.WELCOME);
      } catch {
        console.error('Error on login');
      } finally {
        setIsLoggingIn(false);
      }
    },
    [loginMutation, navigate],
  );

  const logout = useCallback(async () => {
    flushSync(() => setIsLoggingOut(true));
    try {
      await logoutMutation().unwrap();
    } finally {
      clearSession();
      httpService.setToken(null);
      setLogged(false);
      setUserId(null);
      dispatch(api.util.resetApiState());
      navigate(ROUTES.BASE);
      requestAnimationFrame(() => setIsLoggingOut(false));
    }
  }, [logoutMutation, dispatch, navigate]);

  return <AuthContext.Provider value={{ logged, isLoggingIn, isLoggingOut, userId, login, logout }}>{children}</AuthContext.Provider>;
};

export default memo(AuthProvider);

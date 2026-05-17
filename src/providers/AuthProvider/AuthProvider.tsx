import type { PropsWithChildren } from 'react';
import { createContext, memo, useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { httpService } from '#Services/http.service';
import { api } from '#Store/api/api';
import { useLoginMutation, useLogoutMutation } from '#Store/api/auth.api';
import { useAppDispatch } from '#Store/hooks';

import type { AuthContextValue } from './AuthProvider.model';
import { clearSession, readSession, writeSession } from './AuthProvider.utils';

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const session = readSession();

  const [logged, setLogged] = useState<boolean>(session.loggedIn);
  const [userId, setUserId] = useState<number | null>(session.userId);
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
      // flushSync forces React to paint the PageLoader before the async call
      flushSync(() => setIsLoggingIn(true));
      try {
        const res = await loginMutation({ email, password }).unwrap();
        writeSession(res.token, res.userId);
        httpService.setToken(res.token);
        setUserId(res.userId);
        setLogged(true);
        navigate('/welcome');
      } catch {
        // error: stay on login page
      } finally {
        setIsLoggingIn(false);
      }
    },
    [loginMutation, navigate],
  );

  const logout = useCallback(async () => {
    // flushSync forces React to paint the PageLoader before the async call
    flushSync(() => setIsLoggingOut(true));
    try {
      await logoutMutation().unwrap();
    } finally {
      clearSession();
      httpService.setToken(null);
      setLogged(false);
      setUserId(null);
      dispatch(api.util.resetApiState());
      navigate('/');
      // Delay clearing the loader by one frame so the Login route has time to mount
      requestAnimationFrame(() => setIsLoggingOut(false));
    }
  }, [logoutMutation, dispatch, navigate]);

  return <AuthContext.Provider value={{ logged, isLoggingIn, isLoggingOut, userId, login, logout }}>{children}</AuthContext.Provider>;
};

export default memo(AuthProvider);
export { AuthContext };

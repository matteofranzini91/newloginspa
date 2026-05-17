import { createContext, memo, useCallback, useEffect, useState } from 'react';
import type { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLoginMutation, useLogoutMutation } from '#Store/api/auth.api';
import { api } from '#Store/api/api';
import { useAppDispatch } from '#Store/hooks';
import { httpService } from '#Services/http.service';

import type { AuthContextValue } from './AuthProvider.model';
import { clearSession, readSession, writeSession } from './AuthProvider.utils';

const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const session = readSession();

  const [logged, setLogged] = useState<boolean>(session.loggedIn);
  const [userId, setUserId] = useState<number | null>(session.userId);

  const [loginMutation, { isLoading: logging }] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  useEffect(() => {
    const { token } = readSession();
    if (token) httpService.setToken(token);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const res = await loginMutation({ email, password }).unwrap();
        writeSession(res.token, res.userId);
        httpService.setToken(res.token);
        setUserId(res.userId);
        setLogged(true);
        navigate('/welcome');
      } catch {
      }
    },
    [loginMutation, navigate],
  );

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } finally {
      clearSession();
      httpService.setToken(null);
      setLogged(false);
      setUserId(null);
      dispatch(api.util.resetApiState());
      navigate('/');
    }
  }, [logoutMutation, dispatch, navigate]);

  return <AuthContext.Provider value={{ logged, logging, userId, login, logout }}>{children}</AuthContext.Provider>;
};

export default memo(AuthProvider);
export { AuthContext };

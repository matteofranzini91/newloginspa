import { LoginRequest, LoginResponse } from 'services/auth/auth.model';
import { Endpoints, HttpVerbs } from 'services/http.config';
import { api } from './api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (payload) => ({ url: Endpoints.authLogin, method: HttpVerbs.post, data: payload }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: Endpoints.authLogout, method: HttpVerbs.post }),
    }),
    requestPasswordReset: builder.mutation<void, string>({
      query: (email) => ({ url: Endpoints.authResetPassword, method: HttpVerbs.post, data: { email } }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRequestPasswordResetMutation } = authApi;

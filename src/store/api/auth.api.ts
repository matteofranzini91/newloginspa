import type { LoginRequest, LoginResponse } from '#Services/auth.service';

import { api } from './api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (payload) => ({ url: '/auth/login', method: 'post', data: payload }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: '/auth/logout', method: 'post' }),
    }),
    requestPasswordReset: builder.mutation<void, string>({
      query: (email) => ({ url: '/auth/reset-password', method: 'post', data: { email } }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRequestPasswordResetMutation } = authApi;

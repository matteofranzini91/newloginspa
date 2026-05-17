import type { User } from '#Models/user.model';
import type { RegisterUserPayload } from '#Services/user.service';

import { api } from './api';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<User, number>({
      query: (userId) => ({ url: `/users/${userId}`, method: 'get' }),
      providesTags: ['User'],
    }),
    editUser: builder.mutation<User, { id: number; payload: Partial<User> }>({
      query: ({ id, payload }) => ({ url: `/users/${id}`, method: 'put', data: payload }),
      invalidatesTags: ['User'],
    }),
    registerUser: builder.mutation<User, RegisterUserPayload>({
      query: (payload) => ({ url: '/users', method: 'post', data: payload }),
    }),
    deleteUser: builder.mutation<void, number>({
      query: (userId) => ({ url: `/users/${userId}`, method: 'delete' }),
    }),
  }),
});

export const { useGetUserByIdQuery, useEditUserMutation, useRegisterUserMutation, useDeleteUserMutation } = userApi;

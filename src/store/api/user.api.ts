import type { User } from '#Models/user.model';
import { RegisterUserPayload } from 'services/user/user.model';

import { Endpoints, HttpVerbs } from 'services/http.config';
import { api } from './api';

export const USER_TAG_NAME = 'User';

export const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<User, number>({
      query: (userId) => ({ url: `${Endpoints.users}/${userId}`, method: HttpVerbs.get }),
      providesTags: [USER_TAG_NAME],
    }),
    editUser: builder.mutation<User, { id: number; payload: Partial<User> }>({
      query: ({ id, payload }) => ({ url: `${Endpoints.users}/${id}`, method: HttpVerbs.put, data: payload }),
      invalidatesTags: [USER_TAG_NAME],
    }),
    registerUser: builder.mutation<User, RegisterUserPayload>({
      query: (payload) => ({ url: Endpoints.users, method: HttpVerbs.post, data: payload }),
    }),
    deleteUser: builder.mutation<void, number>({
      query: (userId) => ({ url: `${Endpoints.users}/${userId}`, method: HttpVerbs.delete }),
    }),
  }),
});

export const { useGetUserByIdQuery, useEditUserMutation, useRegisterUserMutation, useDeleteUserMutation } = userApi;

import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { AxiosError, AxiosRequestConfig } from 'axios';

import type { ApiError } from '#Models/errors.model';
import { httpService } from '#Services/http.service';

export type AxiosBaseQueryArgs = {
  url: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  data?: unknown;
  config?: AxiosRequestConfig;
};

export const axiosBaseQuery =
  (): BaseQueryFn<AxiosBaseQueryArgs, unknown, ApiError> =>
  async ({ url, method, data, config }) => {
    try {
      let result: unknown;
      if (method === 'get') {
        result = await httpService.get<unknown>(url, config);
      } else if (method === 'delete') {
        result = await httpService.delete<unknown>(url, config);
      } else if (method === 'post') {
        result = await httpService.post<unknown>(url, data, config);
      } else if (method === 'put') {
        result = await httpService.put<unknown>(url, data, config);
      } else {
        result = await httpService.patch<unknown>(url, data, config);
      }
      return { data: result };
    } catch (rawError) {
      const err = rawError as AxiosError<{ message?: string }>;
      return {
        error: {
          code: err.response?.status ?? 0,
          message: err.response?.data?.message ?? err.message ?? 'Unknown error',
        } satisfies ApiError,
      };
    }
  };

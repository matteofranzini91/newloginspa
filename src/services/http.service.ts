import axios, { type AxiosError, type AxiosInstance, type AxiosRequestConfig } from 'axios';

import type { ApiError } from '#Models/errors.model';
import { Endpoints } from './http.config';

type ErrorCallback = (error: ApiError) => void;

class HttpService {
  private http: AxiosInstance;
  private onErrorCallback: ErrorCallback | null = null;

  constructor(baseURL: string) {
    this.http = axios.create({
      baseURL,
      timeout: 10000,
    });

    this.http.interceptors.request.use(
      (config) => config,
      (error: unknown) => Promise.reject(error),
    );

    this.http.interceptors.response.use(
      (response) => response,
      (error: AxiosError<{ message?: string }>) => {
        if (this.onErrorCallback) {
          const apiError: ApiError = {
            code: error.response?.status ?? 0,
            message: error.response?.data?.message ?? error.message,
          };
          this.onErrorCallback(apiError);
        }
        return Promise.reject(error);
      },
    );
  }

  setOnError(callback: ErrorCallback): void {
    this.onErrorCallback = callback;
  }

  setToken(token: string | null): void {
    if (token) {
      this.http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.http.defaults.headers.common['Authorization'];
    }
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.get<T>(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.put<T>(url, data, config);
    return response.data;
  }

  async patch<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.patch<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.http.delete<T>(url, config);
    return response.data;
  }
}

const BASE_URL = import.meta.env.VITE_API_URL ?? Endpoints.apiBase;
export const httpService = new HttpService(BASE_URL);

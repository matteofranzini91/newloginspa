import { httpService } from './http.service';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  userId: number;
}

export interface AuthMeResponse {
  userId: number;
}

export const loginService = (payload: LoginRequest): Promise<LoginResponse> => httpService.post<LoginResponse>('/auth/login', payload);

export const logoutService = (): Promise<void> => httpService.post<void>('/auth/logout');

export const getAuthUserService = (): Promise<AuthMeResponse> => httpService.get<AuthMeResponse>('/auth/me');

export const requestPasswordResetService = (email: string): Promise<void> => httpService.post<void>('/auth/reset-password', { email });

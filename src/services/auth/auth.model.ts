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

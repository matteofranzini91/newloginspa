export interface AuthContextValue {
  logged: boolean;
  isLoggingIn: boolean;
  isLoggingOut: boolean;
  userId: number | null;
  login: (email: string, password: string) => void;
  logout: VoidFunction;
}

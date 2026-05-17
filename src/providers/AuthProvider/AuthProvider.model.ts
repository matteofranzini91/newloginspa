export interface AuthContextValue {
  logged: boolean;
  logging: boolean;
  userId: number | null;
  login: (email: string, password: string) => void;
  logout: VoidFunction;
}

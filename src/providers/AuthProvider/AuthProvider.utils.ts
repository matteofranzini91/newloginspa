import { SESSION_KEYS } from 'constants/global';

export const readSession = (): { loggedIn: boolean; userId: number | null; token: string | null } => ({
  loggedIn: sessionStorage.getItem(SESSION_KEYS.loggedIn) === 'true',
  userId: sessionStorage.getItem(SESSION_KEYS.userId) ? Number(sessionStorage.getItem(SESSION_KEYS.userId)) : null,
  token: sessionStorage.getItem(SESSION_KEYS.token),
});

export const writeSession = (token: string, userId: number): void => {
  sessionStorage.setItem(SESSION_KEYS.token, token);
  sessionStorage.setItem(SESSION_KEYS.loggedIn, 'true');
  sessionStorage.setItem(SESSION_KEYS.userId, String(userId));
};

export const clearSession = (): void => sessionStorage.clear();

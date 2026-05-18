import type { User } from '#Models/user.model';
import { Endpoints } from 'services/http.config';
import { httpService } from 'services/http.service';
import { RegisterUserPayload } from './user.model';

export const registerUserService = (payload: RegisterUserPayload): Promise<User> => httpService.post<User>(Endpoints.users, payload);

export const getUserByIdService = (userId: number): Promise<User> => httpService.get<User>(`${Endpoints.users}/${userId}`);

export const editUserService = (userId: number, payload: Partial<User>): Promise<User> =>
  httpService.put<User>(`${Endpoints.users}/${userId}`, payload);

export const deleteUserService = (userId: number): Promise<void> => httpService.delete<void>(`${Endpoints.users}/${userId}`);

import type { FormState } from '#Models/form.model';
import type { User } from '#Models/user.model';

import { httpService } from './http.service';

export interface RegisterUserPayload {
  name: string;
  surname: string;
  birthday: string;
  email: string;
  password: string;
}

export const buildRegisterPayload = (formValues: FormState): RegisterUserPayload => ({
  name: formValues['name']?.value ?? '',
  surname: formValues['surname']?.value ?? '',
  birthday: formValues['born']?.value ?? '',
  email: formValues['email']?.value ?? '',
  password: formValues['password']?.value ?? '',
});

export const registerUserService = (payload: RegisterUserPayload): Promise<User> => httpService.post<User>('/users', payload);

export const getUserByIdService = (userId: number): Promise<User> => httpService.get<User>(`/users/${userId}`);

export const editUserService = (userId: number, payload: Partial<User>): Promise<User> =>
  httpService.put<User>(`/users/${userId}`, payload);

export const deleteUserService = (userId: number): Promise<void> => httpService.delete<void>(`/users/${userId}`);

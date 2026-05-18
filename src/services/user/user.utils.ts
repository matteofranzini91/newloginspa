import { FormState } from 'models/form.model';
import { RegisterUserPayload } from './user.model';

export const buildRegisterPayload = (formValues: FormState): RegisterUserPayload => ({
  name: formValues['name']?.value ?? '',
  surname: formValues['surname']?.value ?? '',
  birthday: formValues['born']?.value ?? '',
  email: formValues['email']?.value ?? '',
  password: formValues['password']?.value ?? '',
});

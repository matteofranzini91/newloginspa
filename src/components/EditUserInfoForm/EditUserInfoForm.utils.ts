import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import type { FormState } from '#Models/form.model';
import type { User } from '#Models/user.model';

dayjs.extend(customParseFormat);

export const adaptUserInfoToFormValues = (user: User): FormState => ({
  name: { value: user.name, error: false },
  surname: { value: user.surname, error: false },
  company: { value: user.company.name, error: false },
  position: { value: user.company.position, error: false },
  born: { value: user.birthday, error: false },
  email: { value: user.email, error: false },
  phone: { value: user.phone, error: false },
  website: { value: user.website, error: false },
});

export const adaptFormValuesToUserInfo = (formValues: FormState): Partial<User> => {
  const rawDate = formValues['born']?.value ?? '';
  const formatted = rawDate
    ? dayjs(rawDate, ['DD/MM/YYYY', 'YYYY-MM-DD'], true).isValid()
      ? dayjs(rawDate, ['DD/MM/YYYY', 'YYYY-MM-DD'], true).format('DD/MM/YYYY')
      : rawDate
    : '';

  return {
    name: formValues['name']?.value ?? '',
    surname: formValues['surname']?.value ?? '',
    birthday: formatted,
    email: formValues['email']?.value ?? '',
    phone: formValues['phone']?.value ?? '',
    website: formValues['website']?.value ?? '',
    company: {
      name: formValues['company']?.value ?? '',
      position: formValues['position']?.value ?? '',
    },
  };
};

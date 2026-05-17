import { describe, expect, it } from 'vitest';

import type { User } from '#Models/user.model';

import { adaptFormValuesToUserInfo, adaptUserInfoToFormValues } from './EditUserInfoForm.adapters';

const mockUser: User = {
  id: 1,
  name: 'Juan',
  surname: 'García',
  birthday: '15/06/1990',
  email: 'juan@test.com',
  phone: '600111222',
  website: 'https://linkedin.com/in/juan',
  avatar: '',
  company: { name: 'Acme Corp', position: 'Developer' },
};

describe('adaptUserInfoToFormValues', () => {
  it('maps all user fields to FormState entries', () => {
    const formState = adaptUserInfoToFormValues(mockUser);
    expect(formState['name'].value).toBe('Juan');
    expect(formState['surname'].value).toBe('García');
    expect(formState['company'].value).toBe('Acme Corp');
    expect(formState['position'].value).toBe('Developer');
    expect(formState['born'].value).toBe('15/06/1990');
    expect(formState['email'].value).toBe('juan@test.com');
    expect(formState['phone'].value).toBe('600111222');
    expect(formState['website'].value).toBe('https://linkedin.com/in/juan');
  });

  it('marks all fields as non-error', () => {
    const formState = adaptUserInfoToFormValues(mockUser);
    Object.values(formState).forEach((field) => expect(field.error).toBe(false));
  });
});

describe('adaptFormValuesToUserInfo', () => {
  const formValues = adaptUserInfoToFormValues(mockUser);

  it('maps form values back to User shape', () => {
    const result = adaptFormValuesToUserInfo(formValues);
    expect(result.name).toBe('Juan');
    expect(result.email).toBe('juan@test.com');
    expect(result.company?.name).toBe('Acme Corp');
    expect(result.company?.position).toBe('Developer');
  });

  it('formats date as DD/MM/YYYY', () => {
    const result = adaptFormValuesToUserInfo(formValues);
    expect(result.birthday).toBe('15/06/1990');
  });

  it('also handles ISO date format (from DatePicker output)', () => {
    const isoFormValues = {
      ...formValues,
      born: { value: '1990-06-15', error: false },
    };
    const result = adaptFormValuesToUserInfo(isoFormValues);
    expect(result.birthday).toBe('15/06/1990');
  });
});

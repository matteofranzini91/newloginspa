import type { FieldLayout } from '#Models/form.model';

export const registerFormLayout: FieldLayout[] = [
  { type: 'text', label: 'fields.name', name: 'name' },
  { type: 'text', label: 'fields.surname', name: 'surname' },
  { type: 'date', label: 'fields.birthday', name: 'born' },
  { type: 'email', label: 'fields.email', name: 'email' },
  { type: 'password', label: 'fields.password', name: 'password' },
];

import type { FieldLayout } from '#Models/form.model';

export const loginFormLayout: FieldLayout[] = [
  { type: 'email', label: 'fields.email', name: 'email' },
  { type: 'password', label: 'fields.password', name: 'password' },
];

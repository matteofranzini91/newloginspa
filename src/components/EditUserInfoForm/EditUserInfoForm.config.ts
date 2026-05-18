import type { FieldLayout } from '#Models/form.model';

export const editUserInfoFormLayout: FieldLayout[] = [
  { type: 'text', label: 'fields.name', name: 'name', gridGroup: 'personal' },
  { type: 'text', label: 'fields.surname', name: 'surname', gridGroup: 'personal' },
  { type: 'text', label: 'fields.company', name: 'company', gridGroup: 'work' },
  { type: 'text', label: 'fields.position', name: 'position', gridGroup: 'work' },
  { type: 'date', label: 'fields.birthday', name: 'born' },
  { type: 'email', label: 'fields.email', name: 'email' },
  { type: 'text', label: 'fields.phone', name: 'phone' },
  { type: 'text', label: 'fields.website', name: 'website' },
];

import type { I18nKey } from '#Config/i18n/i18n.types';

export type FieldType = 'text' | 'email' | 'password' | 'date';

export type FieldLayout = {
  type: FieldType;
  label: I18nKey;
  name: string;
  gridGroup?: string;
};

export type FieldState = {
  value: string;
  error: boolean;
};

export type FormState = Record<string, FieldState>;

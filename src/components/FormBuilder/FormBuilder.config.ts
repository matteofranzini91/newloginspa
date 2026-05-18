import type { ComponentType } from 'react';

import type { FieldType } from '#Models/form.model';

import FormDateField from './components/FormDateField';
import FormEmailField from './components/FormEmailField';
import FormPasswordField from './components/FormPasswordField';
import FormTextField from './components/FormTextField';
import type { FormFieldProps } from './FormBuilder.model';

export const FIELD_COMPONENT_MAP: Record<FieldType, ComponentType<FormFieldProps>> = {
  text: FormTextField,
  email: FormEmailField,
  password: FormPasswordField,
  date: FormDateField,
};

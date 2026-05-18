import type { I18nKey } from '#Config/i18n/i18n.types';
import type { Dayjs } from 'dayjs';
import type { ReactNode } from 'react';

import type { FieldLayout, FormState } from '#Models/form.model';

export type FormBuilderProps = {
  formLayout: FieldLayout[];
  submitButtonTextKey: I18nKey;
  loadingSubmitButton: boolean;
  handleSubmit: (values: FormState) => void;
  defaultValues?: FormState | null;
  children?: ReactNode;
  renderSubmitButton?: ReactNode;
};

export type DateFieldEvent = {
  target: {
    name: string;
    value: string | null;
  };
};

export type FormFieldProps = {
  value: string;
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | DateFieldEvent) => void;
};

export type FormDateFieldProps = Omit<FormFieldProps, 'onChange'> & {
  onChange: (e: DateFieldEvent) => void;
  dayjsValue: Dayjs | null;
};

export type FieldGroup = { kind: 'single'; field: FieldLayout } | { kind: 'grid'; groupId: string; fields: FieldLayout[] };

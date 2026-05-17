import type { Dayjs } from 'dayjs';
import type { ReactNode } from 'react';

import type { FieldLayout, FormState } from '#Models/form.model';

export type FormBuilderProps = {
  formLayout: FieldLayout[];
  submitButtonTextKey: string;
  loadingSubmitButton: boolean;
  handleSubmit: (values: FormState) => void;
  defaultValues?: FormState | null;
  children?: ReactNode;
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

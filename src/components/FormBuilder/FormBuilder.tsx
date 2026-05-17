import Box from '@mui/material/Box';
import type { ComponentType } from 'react';
import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SubmitButton from '#Components/SubmitButton/SubmitButton';
import type { FieldType, FormState } from '#Models/form.model';

import type { DateFieldEvent, FormBuilderProps, FormFieldProps } from './FormBuilder.model';
import FormDateField from './components/FormDateField';
import FormEmailField from './components/FormEmailField';
import FormPasswordField from './components/FormPasswordField';
import FormTextField from './components/FormTextField';

const FIELD_COMPONENT_MAP: Record<FieldType, ComponentType<FormFieldProps>> = {
  text: FormTextField,
  email: FormEmailField,
  password: FormPasswordField,
  date: FormDateField,
};

const buildInitialState = (layout: FormBuilderProps['formLayout'], defaultValues: FormState | null | undefined): FormState =>
  layout.reduce<FormState>((acc, field) => {
    acc[field.name] = defaultValues?.[field.name] ?? { value: '', error: false };
    return acc;
  }, {});

const FormBuilder = ({
  formLayout,
  handleSubmit,
  submitButtonTextKey,
  loadingSubmitButton,
  defaultValues = null,
  children = null,
}: FormBuilderProps) => {
  const { t } = useTranslation();

  const initialState = useMemo(
    () => buildInitialState(formLayout, defaultValues),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [formState, setFormState] = useState<FormState>(initialState);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | DateFieldEvent) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: { value: value ?? '', error: false },
    }));
  }, []);

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit(formState);
  };

  return (
    <Box component="form" autoComplete="off" onSubmit={onFormSubmit}>
      {formLayout.map((field) => {
        const FieldComponent = FIELD_COMPONENT_MAP[field.type];
        return (
          <FieldComponent
            key={field.name}
            value={formState[field.name]?.value ?? ''}
            label={t(field.label)}
            name={field.name}
            onChange={handleChange}
          />
        );
      })}
      {children}
      <SubmitButton textKey={submitButtonTextKey} loading={loadingSubmitButton} />
    </Box>
  );
};

export default memo(FormBuilder);

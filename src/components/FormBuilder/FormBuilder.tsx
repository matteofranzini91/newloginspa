import Box from '@mui/material/Box';
import type { ComponentType } from 'react';
import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SubmitButton from '#Components/SubmitButton/SubmitButton';
import type { FieldLayout, FieldType, FormState } from '#Models/form.model';

import type { DateFieldEvent, FormBuilderProps, FormFieldProps } from './FormBuilder.model';
import { FieldsGroup } from './FormBuilder.styles';
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

type FieldGroup = { kind: 'single'; field: FieldLayout } | { kind: 'grid'; groupId: string; fields: FieldLayout[] };

const groupFields = (layout: FieldLayout[]): FieldGroup[] => {
  const groups: FieldGroup[] = [];
  const gridMap = new Map<string, FieldLayout[]>();

  for (const field of layout) {
    if (field.gridGroup) {
      if (!gridMap.has(field.gridGroup)) {
        const fields: FieldLayout[] = [];
        gridMap.set(field.gridGroup, fields);
        groups.push({ kind: 'grid', groupId: field.gridGroup, fields });
      }
      gridMap.get(field.gridGroup)!.push(field);
    } else {
      groups.push({ kind: 'single', field });
    }
  }

  return groups;
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
  renderSubmitButton = null,
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

  const fieldGroups = useMemo(() => groupFields(formLayout), [formLayout]);

  return (
    <Box component="form" autoComplete="off" onSubmit={onFormSubmit}>
      {fieldGroups.map((group) => {
        if (group.kind === 'grid') {
          return (
            <FieldsGroup key={group.groupId}>
              {group.fields.map((field) => {
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
            </FieldsGroup>
          );
        }

        const FieldComponent = FIELD_COMPONENT_MAP[group.field.type];
        return (
          <FieldComponent
            key={group.field.name}
            value={formState[group.field.name]?.value ?? ''}
            label={t(group.field.label)}
            name={group.field.name}
            onChange={handleChange}
          />
        );
      })}
      {children}
      {renderSubmitButton ?? <SubmitButton textKey={submitButtonTextKey} loading={loadingSubmitButton} />}
    </Box>
  );
};

export default memo(FormBuilder);

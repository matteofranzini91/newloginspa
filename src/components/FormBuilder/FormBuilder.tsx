import Box from '@mui/material/Box';
import React, { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import SubmitButton from '#Components/SubmitButton/SubmitButton';
import type { FormState } from '#Models/form.model';

import { FIELD_COMPONENT_MAP } from './FormBuilder.config';
import type { DateFieldEvent, FormBuilderProps } from './FormBuilder.model';
import { FieldsGroup } from './FormBuilder.styles';
import { buildInitialState, getGroupFields } from './FormBuilder.utils';

const FormBuilder: React.FC<FormBuilderProps> = ({
  formLayout,
  handleSubmit,
  submitButtonTextKey,
  loadingSubmitButton,
  defaultValues = null,
  children = null,
  renderSubmitButton = null,
}) => {
  const { t } = useTranslation();

  const initialState = useMemo(() => buildInitialState(formLayout, defaultValues), []);

  const [formState, setFormState] = useState<FormState>(initialState);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | DateFieldEvent) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: { value: value ?? '', error: false },
    }));
  }, []);

  const onFormSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();
    handleSubmit(formState);
  };

  const fieldGroups = useMemo(() => getGroupFields(formLayout), [formLayout]);

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

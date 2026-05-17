import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import FormDateField from '#Components/FormBuilder/components/FormDateField';
import FormEmailField from '#Components/FormBuilder/components/FormEmailField';
import FormTextField from '#Components/FormBuilder/components/FormTextField';
import { useAuth } from '#Hooks/useAuth';
import type { FormState } from '#Models/form.model';
import { useGetUserByIdQuery } from '#Store/api/user.api';

import { adaptUserInfoToFormValues } from './EditUserInfoForm.adapters';
import type { EditUserInfoFormProps } from './EditUserInfoForm.model';
import { EditFormSaveButton, EditFormTitle, EditFormWrapper, FieldsGrid, SaveButtonWrapper } from './EditUserInfoForm.styles';
import { useEditUserSubmit } from './hooks/useEditUserSubmit';

const buildInitialState = (defaultValues: FormState | null): FormState => ({
  name: defaultValues?.name ?? { value: '', error: false },
  surname: defaultValues?.surname ?? { value: '', error: false },
  company: defaultValues?.company ?? { value: '', error: false },
  position: defaultValues?.position ?? { value: '', error: false },
  born: defaultValues?.born ?? { value: '', error: false },
  email: defaultValues?.email ?? { value: '', error: false },
  phone: defaultValues?.phone ?? { value: '', error: false },
  website: defaultValues?.website ?? { value: '', error: false },
});

const EditUserInfoForm = ({ onClose }: EditUserInfoFormProps) => {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const { data: user } = useGetUserByIdQuery(userId as number, { skip: !userId });
  const { handleSubmit, isLoading } = useEditUserSubmit(onClose);

  const defaultValues = useMemo(() => (user ? adaptUserInfoToFormValues(user) : null), [user]);

  const [formState, setFormState] = useState<FormState>(() => buildInitialState(defaultValues));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string | null } }) => {
      const { name, value } = e.target;
      setFormState((prev) => ({
        ...prev,
        [name]: { value: value ?? '', error: false },
      }));
    },
    [],
  );

  const onFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSubmit(formState);
  };

  return (
    <EditFormWrapper component="form" autoComplete="off" onSubmit={onFormSubmit}>
      <EditFormTitle>{t('user.edit.formTitle')}</EditFormTitle>

      <FieldsGrid>
        <FormTextField value={formState.name?.value ?? ''} label={t('fields.name')} name="name" onChange={handleChange} />
        <FormTextField value={formState.surname?.value ?? ''} label={t('fields.surname')} name="surname" onChange={handleChange} />
        <FormTextField value={formState.company?.value ?? ''} label={t('fields.company')} name="company" onChange={handleChange} />
        <FormTextField value={formState.position?.value ?? ''} label={t('fields.position')} name="position" onChange={handleChange} />
      </FieldsGrid>

      <FormEmailField value={formState.email?.value ?? ''} label={t('fields.email')} name="email" onChange={handleChange} />
      <FormTextField value={formState.phone?.value ?? ''} label={t('fields.phone')} name="phone" onChange={handleChange} />
      <FormTextField value={formState.website?.value ?? ''} label={t('fields.website')} name="website" onChange={handleChange} />
      <FormDateField value={formState.born?.value ?? ''} label={t('fields.birthday')} name="born" onChange={handleChange} />

      <SaveButtonWrapper>
        {isLoading ? (
          <CircularProgress color="secondary" size={28} />
        ) : (
          <EditFormSaveButton type="submit" variant="contained" disableElevation startIcon={<SaveIcon />}>
            {t('user.edit.saveButton')}
          </EditFormSaveButton>
        )}
      </SaveButtonWrapper>
    </EditFormWrapper>
  );
};

export default EditUserInfoForm;

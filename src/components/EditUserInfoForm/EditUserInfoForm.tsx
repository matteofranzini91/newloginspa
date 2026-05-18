import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import FormBuilder from '#Components/FormBuilder/FormBuilder';
import { useAuth } from '#Hooks/useAuth';
import { useGetUserByIdQuery } from '#Store/api/user.api';

import { editUserInfoFormLayout } from './EditUserInfoForm.config';
import type { EditUserInfoFormProps } from './EditUserInfoForm.model';
import { EditFormSaveButton, EditFormTitle, EditFormWrapper, SaveButtonWrapper } from './EditUserInfoForm.styles';
import { adaptUserInfoToFormValues } from './EditUserInfoForm.utils';
import { useEditUserSubmit } from './hooks/useEditUserSubmit';

const EditUserInfoForm = ({ onClose }: EditUserInfoFormProps) => {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const { data: user } = useGetUserByIdQuery(userId as number, { skip: !userId });
  const { handleSubmit, isLoading } = useEditUserSubmit(onClose);

  const defaultValues = useMemo(() => (user ? adaptUserInfoToFormValues(user) : null), [user]);

  const submitButton = (
    <SaveButtonWrapper>
      {isLoading ? (
        <CircularProgress color="secondary" size={28} />
      ) : (
        <EditFormSaveButton type="submit" variant="contained" disableElevation startIcon={<SaveIcon />}>
          {t('user.edit.saveButton')}
        </EditFormSaveButton>
      )}
    </SaveButtonWrapper>
  );

  return (
    <EditFormWrapper>
      <EditFormTitle>{t('user.edit.formTitle')}</EditFormTitle>
      <FormBuilder
        formLayout={editUserInfoFormLayout}
        submitButtonTextKey="user.edit.saveButton"
        loadingSubmitButton={isLoading}
        handleSubmit={handleSubmit}
        defaultValues={defaultValues}
        renderSubmitButton={submitButton}
      />
    </EditFormWrapper>
  );
};

export default EditUserInfoForm;

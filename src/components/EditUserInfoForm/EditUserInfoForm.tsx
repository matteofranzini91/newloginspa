import SaveIcon from '@mui/icons-material/Save';
import CircularProgress from '@mui/material/CircularProgress';
import React, { useMemo } from 'react';

import FormBuilder from '#Components/FormBuilder/FormBuilder';
import { useAuth } from '#Hooks/useAuth';
import { useGetUserByIdQuery } from '#Store/api/user.api';

import { TranslatedText } from 'components/TranslatedText/TranslatedText';
import { editUserInfoFormLayout } from './EditUserInfoForm.config';
import type { EditUserInfoFormProps } from './EditUserInfoForm.model';
import { EditFormSaveButton, EditFormTitle, EditFormWrapper, SaveButtonWrapper } from './EditUserInfoForm.styles';
import { adaptUserInfoToFormValues } from './EditUserInfoForm.utils';
import { useEditUserSubmit } from './hooks/useEditUserSubmit';

export const EditUserInfoForm: React.FC<EditUserInfoFormProps> = ({ onClose }) => {
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
          <TranslatedText i18nKey="user.edit.saveButton" />
        </EditFormSaveButton>
      )}
    </SaveButtonWrapper>
  );

  return (
    <EditFormWrapper>
      <EditFormTitle>
        <TranslatedText i18nKey="user.edit.formTitle" variant="h3" component="h3" />
      </EditFormTitle>
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

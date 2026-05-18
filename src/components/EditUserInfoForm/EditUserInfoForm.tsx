import SaveIcon from '@mui/icons-material/Save';
import React, { useMemo } from 'react';

import FormBuilder from '#Components/FormBuilder/FormBuilder';
import SubmitButton from '#Components/SubmitButton/SubmitButton';
import { useAuth } from '#Hooks/useAuth';
import { useGetUserByIdQuery } from '#Store/api/user.api';

import { TranslatedText } from 'components/TranslatedText/TranslatedText';
import { editUserInfoFormLayout } from './EditUserInfoForm.config';
import type { EditUserInfoFormProps } from './EditUserInfoForm.model';
import { EditFormTitle, EditFormWrapper } from './EditUserInfoForm.styles';
import { adaptUserInfoToFormValues } from './EditUserInfoForm.utils';
import { useEditUserSubmit } from './hooks/useEditUserSubmit';

export const EditUserInfoForm: React.FC<EditUserInfoFormProps> = ({ onClose }) => {
  const { userId } = useAuth();
  const { data: user } = useGetUserByIdQuery(userId as number, { skip: !userId });
  const { handleSubmit, isLoading } = useEditUserSubmit(onClose);

  const defaultValues = useMemo(() => (user ? adaptUserInfoToFormValues(user) : null), [user]);

  return (
    <EditFormWrapper>
      <EditFormTitle>
        <TranslatedText i18nKey="user.edit.formTitle" variant="h5" component="h5" />
      </EditFormTitle>
      <FormBuilder
        formLayout={editUserInfoFormLayout}
        submitButtonTextKey="user.edit.saveButton"
        loadingSubmitButton={isLoading}
        handleSubmit={handleSubmit}
        defaultValues={defaultValues}
        renderSubmitButton={<SubmitButton textKey="user.edit.saveButton" loading={isLoading} startIcon={<SaveIcon />} />}
      />
    </EditFormWrapper>
  );
};

import FormBuilder from '#Components/FormBuilder/FormBuilder';
import { useAuth } from '#Hooks/useAuth';
import { useGetUserByIdQuery } from '#Store/api/user.api';

import { adaptUserInfoToFormValues } from './EditUserInfoForm.adapters';
import type { EditUserInfoFormProps } from './EditUserInfoForm.model';
import { editUserInfoFormLayout } from './EditUserInfoForm.utils';
import { useEditUserSubmit } from './hooks/useEditUserSubmit';

const EditUserInfoForm = ({ onClose }: EditUserInfoFormProps) => {
  const { userId } = useAuth();
  const { data: user } = useGetUserByIdQuery(userId as number, { skip: !userId });
  const { handleSubmit, isLoading } = useEditUserSubmit(onClose);

  return (
    <FormBuilder
      formLayout={editUserInfoFormLayout}
      submitButtonTextKey="user.edit.saveButton"
      loadingSubmitButton={isLoading}
      handleSubmit={handleSubmit}
      defaultValues={user ? adaptUserInfoToFormValues(user) : null}
    />
  );
};

export default EditUserInfoForm;

import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import { useAuth } from '#Hooks/useAuth';
import type { FormState } from '#Models/form.model';
import { useEditUserMutation } from '#Store/api/user.api';

import { adaptFormValuesToUserInfo } from '../EditUserInfoForm.adapters';

export const useEditUserSubmit = (onSuccess: VoidFunction) => {
  const { t } = useTranslation();
  const { userId } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [editUser, { isLoading }] = useEditUserMutation();

  const handleSubmit = async (formValues: FormState) => {
    if (!userId) return;
    try {
      await editUser({ id: userId, payload: adaptFormValuesToUserInfo(formValues) }).unwrap();
      enqueueSnackbar(t('user.edit.success'), { variant: 'success' });
      onSuccess();
    } catch {

    }
  };

  return { handleSubmit, isLoading };
};

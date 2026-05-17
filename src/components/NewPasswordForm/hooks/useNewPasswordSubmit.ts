import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import type { FormState } from '#Models/form.model';
import { useRequestPasswordResetMutation } from '#Store/api/auth.api';

export const useNewPasswordSubmit = (onSuccess: VoidFunction) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [requestPasswordReset, { isLoading }] = useRequestPasswordResetMutation();

  const handleSubmit = async (formValues: FormState) => {
    try {
      await requestPasswordReset(formValues['email']?.value ?? '').unwrap();
      enqueueSnackbar(t('auth.resetPassword.success'), { variant: 'success' });
      onSuccess();
    } catch {

    }
  };

  return { handleSubmit, isLoading };
};

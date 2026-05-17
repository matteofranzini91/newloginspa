import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';

import type { FormState } from '#Models/form.model';
import { buildRegisterPayload } from '#Services/user.service';
import { useRegisterUserMutation } from '#Store/api/user.api';

export const useRegisterSubmit = (onSuccess: VoidFunction) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleSubmit = async (formValues: FormState) => {
    try {
      await registerUser(buildRegisterPayload(formValues)).unwrap();
      enqueueSnackbar(t('auth.register.success'), { variant: 'success' });
      onSuccess();
    } catch {}
  };

  return { handleSubmit, isLoading };
};

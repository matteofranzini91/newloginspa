import { useAuth } from '#Hooks/useAuth';
import type { FormState } from '#Models/form.model';

export const useLoginSubmit = () => {
  const auth = useAuth();

  const handleSubmit = (formValues: FormState) => {
    auth.login(formValues['email']?.value ?? '', formValues['password']?.value ?? '');
  };

  return { handleSubmit, isLoading: auth.isLoggingIn };
};

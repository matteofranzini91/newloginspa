import { memo } from 'react';

import { CommonButton } from '#Components/CommonButton/CommonButton';
import FormBuilder from '#Components/FormBuilder/FormBuilder';
import { FormFooter } from '#Components/FormFooter/FormFooter';
import { TranslatedText } from 'components/TranslatedText/TranslatedText';

import type { NewPasswordFormProps } from './NewPasswordForm.model';
import { newPasswordFormLayout } from './NewPasswordForm.utils';
import { useNewPasswordSubmit } from './hooks/useNewPasswordSubmit';

const NewPasswordForm = ({ onGoToLoginForm, onGoToRegister }: NewPasswordFormProps) => {
  const { handleSubmit, isLoading } = useNewPasswordSubmit(onGoToLoginForm);

  return (
    <>
      <TranslatedText i18nKey="auth.resetPassword.title" variant="h2" component="h2" />
      <TranslatedText i18nKey="auth.resetPassword.subtitle" variant="subtitle2" component="p" />
      <FormBuilder
        formLayout={newPasswordFormLayout}
        submitButtonTextKey="auth.resetPassword.submitButton"
        loadingSubmitButton={isLoading}
        handleSubmit={handleSubmit}
      >
        <CommonButton i18nKey="auth.resetPassword.accessButton" onButtonClick={onGoToLoginForm} />
      </FormBuilder>
      <FormFooter textKey="auth.resetPassword.noProfileYet" actionButton={onGoToRegister} />
    </>
  );
};

export default memo(NewPasswordForm);

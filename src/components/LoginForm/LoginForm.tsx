import { CommonButton } from '#Components/CommonButton/CommonButton';
import FormBuilder from '#Components/FormBuilder/FormBuilder';
import { FormFooter } from '#Components/FormFooter/FormFooter';
import { TranslatedText } from 'components/TranslatedText/TranslatedText';
import { memo } from 'react';

import type { LoginFormProps } from './LoginForm.model';
import { loginFormLayout } from './LoginForm.utils';
import { useLoginSubmit } from './hooks/useLoginSubmit';

const LoginForm = ({ onGoToForgotPassword, onGoToRegister }: LoginFormProps) => {
  const { handleSubmit, isLoading } = useLoginSubmit();

  return (
    <>
      <TranslatedText i18nKey="auth.login.title" variant="h2" component="h2" />
      <FormBuilder
        formLayout={loginFormLayout}
        submitButtonTextKey="auth.login.submitButton"
        loadingSubmitButton={isLoading}
        handleSubmit={handleSubmit}
      >
        <CommonButton i18nKey="auth.login.forgotPassword" onButtonClick={onGoToForgotPassword} />
      </FormBuilder>
      <FormFooter textKey="auth.login.noProfileYet" actionButton={onGoToRegister} />
    </>
  );
};

export default memo(LoginForm);

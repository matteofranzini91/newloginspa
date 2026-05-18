import { memo } from 'react';

import { CommonButton } from '#Components/CommonButton/CommonButton';
import FormBuilder from '#Components/FormBuilder/FormBuilder';
import { FormFooter } from '#Components/FormFooter/FormFooter';
import { TranslatedText } from 'components/TranslatedText/TranslatedText';

import type { RegisterFormProps } from './RegisterForm.model';
import { registerFormLayout } from './RegisterForm.utils';
import { useRegisterSubmit } from './hooks/useRegisterSubmit';

const RegisterForm = ({ onGoToLoginForm, onGoToForgotPassword }: RegisterFormProps) => {
  const { handleSubmit, isLoading } = useRegisterSubmit(onGoToLoginForm);

  return (
    <>
      <TranslatedText i18nKey="auth.register.title" variant="h2" component="h2" />
      <FormBuilder
        formLayout={registerFormLayout}
        submitButtonTextKey="auth.register.submitButton"
        loadingSubmitButton={isLoading}
        handleSubmit={handleSubmit}
      >
        <CommonButton i18nKey="auth.register.alreadyRegisteredAndForgotten" onButtonClick={onGoToForgotPassword} />
      </FormBuilder>
      <FormFooter textKey="auth.register.alreadyRegistered" actionButton={onGoToLoginForm} />
    </>
  );
};

export default memo(RegisterForm);

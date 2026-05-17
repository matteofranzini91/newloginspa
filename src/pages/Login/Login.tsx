import Slide from '@mui/material/Slide';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from '#Components/LoginForm/LoginForm';
import NewPasswordForm from '#Components/NewPasswordForm/NewPasswordForm';
import RegisterForm from '#Components/RegisterForm/RegisterForm';
import LanguageSelector from '#Components/LanguageSelector/LanguageSelector';
import { useAuth } from '#Hooks/useAuth';

import type { LoginPanelView } from './Login.model';
import { LanguageSelectorWrapper, LoginFormPanel, LoginPageGrid, SlidePanel, SlidesContainer } from './Login.styles';

const INITIAL_VIEW: LoginPanelView = {
  showLoginForm: true,
  showNewPasswordForm: false,
  showRegisterForm: false,
};

const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const [loginPanelView, setLoginPanelView] = useState<LoginPanelView>(INITIAL_VIEW);

  useEffect(() => {
    if (auth.logged) navigate('/welcome');
  }, [auth.logged, navigate]);

  const goToLoginForm = () =>
    setLoginPanelView({ showLoginForm: true, showNewPasswordForm: false, showRegisterForm: false });

  const goToRegister = () =>
    setLoginPanelView({ showLoginForm: false, showNewPasswordForm: false, showRegisterForm: true });

  const goToForgotPassword = () =>
    setLoginPanelView({ showLoginForm: false, showNewPasswordForm: true, showRegisterForm: false });

  return (
    <LoginPageGrid container>
      <LoginFormPanel ref={containerRef}>
        <LanguageSelectorWrapper>
          <LanguageSelector />
        </LanguageSelectorWrapper>
        <SlidesContainer>
          <Slide direction="down" in={loginPanelView.showLoginForm} container={containerRef.current}>
            <SlidePanel>
              <LoginForm onGoToForgotPassword={goToForgotPassword} onGoToRegister={goToRegister} />
            </SlidePanel>
          </Slide>
          <Slide direction="up" in={loginPanelView.showNewPasswordForm} container={containerRef.current}>
            <SlidePanel>
              <NewPasswordForm onGoToLoginForm={goToLoginForm} onGoToRegister={goToRegister} />
            </SlidePanel>
          </Slide>
          <Slide direction="right" in={loginPanelView.showRegisterForm} container={containerRef.current}>
            <SlidePanel>
              <RegisterForm onGoToLoginForm={goToLoginForm} onGoToForgotPassword={goToForgotPassword} />
            </SlidePanel>
          </Slide>
        </SlidesContainer>
      </LoginFormPanel>
    </LoginPageGrid>
  );
};

export default Login;

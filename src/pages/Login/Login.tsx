import Fade from '@mui/material/Fade';
import Slide from '@mui/material/Slide';
import { useCallback, useEffect, useRef, useState } from 'react';

import { LanguageSelector } from '#Components/LanguageSelector/LanguageSelector';
import LoginForm from '#Components/LoginForm/LoginForm';
import NewPasswordForm from '#Components/NewPasswordForm/NewPasswordForm';
import RegisterForm from '#Components/RegisterForm/RegisterForm';

import { ColorSchemes } from 'models/common.model';
import { INITIAL_VIEW } from './Login.config';
import type { LoginPanelView } from './Login.model';
import { LanguageSelectorWrapper, LoginFormPanel, LoginPageGrid, SlidePanel, SlidesContainer } from './Login.styles';

const Login = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerNode, setContainerNode] = useState<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  const [loginPanelView, setLoginPanelView] = useState<LoginPanelView>(INITIAL_VIEW);

  useEffect(() => {
    setContainerNode(containerRef.current);
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const goToLoginForm = useCallback(() => setLoginPanelView({ showLoginForm: true, showNewPasswordForm: false, showRegisterForm: false }), []);

  const goToRegister = useCallback(() => setLoginPanelView({ showLoginForm: false, showNewPasswordForm: false, showRegisterForm: true }), []);

  const goToForgotPassword = useCallback(() => setLoginPanelView({ showLoginForm: false, showNewPasswordForm: true, showRegisterForm: false }), []);

  return (
    <Fade in={visible} timeout={350}>
      <LoginPageGrid container>
        <LoginFormPanel ref={containerRef}>
          <LanguageSelectorWrapper>
            <LanguageSelector colorScheme={ColorSchemes.dark} />
          </LanguageSelectorWrapper>
          <SlidesContainer>
            <Slide direction="down" in={loginPanelView.showLoginForm} container={containerNode} mountOnEnter unmountOnExit>
              <SlidePanel>
                <LoginForm onGoToForgotPassword={goToForgotPassword} onGoToRegister={goToRegister} />
              </SlidePanel>
            </Slide>
            <Slide direction="up" in={loginPanelView.showNewPasswordForm} container={containerNode} mountOnEnter unmountOnExit>
              <SlidePanel>
                <NewPasswordForm onGoToLoginForm={goToLoginForm} onGoToRegister={goToRegister} />
              </SlidePanel>
            </Slide>
            <Slide direction="right" in={loginPanelView.showRegisterForm} container={containerNode} mountOnEnter unmountOnExit>
              <SlidePanel>
                <RegisterForm onGoToLoginForm={goToLoginForm} onGoToForgotPassword={goToForgotPassword} />
              </SlidePanel>
            </Slide>
          </SlidesContainer>
        </LoginFormPanel>
      </LoginPageGrid>
    </Fade>
  );
};

export default Login;

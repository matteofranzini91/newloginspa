import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import loginBg from '#Assets/images/login-background.png';

export const LoginPageGrid = styled(Grid)(() => ({
  justifyContent: 'flex-end',
  minHeight: '100vh',
  backgroundImage: `url(${loginBg})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'bottom right',
}));

export const LoginFormPanel = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(6),
  overflow: 'hidden',
  position: 'relative',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(8),
    width: '70%',
  },
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10),
    width: '55%',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '13rem',
    width: '41.666%',
  },
  [theme.breakpoints.up('xl')]: {
    padding: '10rem',
    width: '33.333%',
  },
  [theme.breakpoints.up(1920)]: {
    padding: '7rem',
  },
}));

export const SlidesContainer = styled(Box)(() => ({
  position: 'relative',
  height: '100%',
}));

export const SlidePanel = styled(Box)(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

export const LanguageSelectorWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(2),
  right: theme.spacing(2),
}));

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

export const WelcomeContainer = styled(Container)(() => ({
  height: '100%',
  paddingTop: '5rem',
  paddingBottom: '5rem',
}));

export const CardWrapper = styled(Box)(() => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

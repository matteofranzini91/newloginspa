import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const SubmitButtonWrapper = styled(Box)(() => ({
  margin: '2rem 0',
  display: 'flex',
  justifyContent: 'center',
}));

export const StyledSubmitButton = styled(Button)(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.quaternary.main,
  color: theme.palette.primary.main,
  padding: '0.7rem',
  borderRadius: '2rem',
  margin: 0,
  '&:hover': {
    backgroundColor: theme.palette.tertiary.main,
  },
}));

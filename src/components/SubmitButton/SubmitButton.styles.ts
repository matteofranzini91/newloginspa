import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const SubmitButtonWrapper = styled(Box)(({ theme }) => ({
  margin: '1.25rem 0',
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.up('xl')]: {
    margin: '2rem 0',
  },
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

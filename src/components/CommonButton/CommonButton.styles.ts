import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const LinkButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  padding: 0,
  fontWeight: 'normal',
  color: theme.palette.quaternary.main,
  '&:hover': {
    color: theme.palette.secondary.main,
    backgroundColor: 'transparent',
  },
}));

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const StyledNavbar = styled(AppBar)(({ theme }) => ({
  backgroundColor: `${theme.palette.primary.main} !important`,
  '& .MuiToolbar-root': {
    justifyContent: 'space-between',
  },
}));

export const NavbarLogo = styled('img')(() => ({
  maxWidth: '5rem',
}));

export const UserMenuBox = styled(Box)(() => ({
  flexGrow: 0,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
}));

export const MenuItemText = styled(Typography)(() => ({
  textAlign: 'center',
}));

export const NavbarSkeletonWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: '0.441rem 0',
  '& .MuiStack-root': {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '0.5rem',
  },
}));

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const UserCardRoot = styled(Card)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    minWidth: '400px',
    maxWidth: '600px',
  },
}));

export const UserAvatarImage = styled('img')(() => ({
  display: 'block',
  width: '10rem',
  height: '10rem',
  margin: '0 auto 1.5rem',
  borderRadius: '50%',
  boxShadow: '0 0 1.5rem 0 rgba(0, 0, 0, 0.23)',
}));

export const CenteredText = styled(Box)(() => ({
  textAlign: 'center',
}));

export const UserInfoRow = styled(Box)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '1rem',
  marginBottom: '0.5rem',
}));

export const LinkedInLink = styled('a')(() => ({
  textDecoration: 'underline',
  '&:hover': {
    textDecoration: 'none',
  },
}));

export const BlockTypography = styled(Typography)(() => ({
  display: 'block',
  marginBottom: '0.35em',
}));

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const UserCardRoot = styled(Card)(({ theme }) => ({
  width: '100%',
  overflow: 'visible',
  borderRadius: '1.25rem',
  boxShadow: '0 8px 40px 0 rgba(126, 87, 194, 0.18)',
  [theme.breakpoints.up('sm')]: {
    minWidth: '420px',
    maxWidth: '560px',
  },
}));

export const UserCardHeader = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, ${theme.palette.tertiary.main} 0%, ${theme.palette.secondary.main} 100%)`,
  borderRadius: '1.25rem 1.25rem 0 0',
  padding: '2.5rem 1.5rem 4rem',
  position: 'relative',
  display: 'flex',
  justifyContent: 'flex-end',
}));

export const UserCardBody = styled(Box)(() => ({
  padding: '0 1.75rem 1.75rem',
  position: 'relative',
}));

export const AvatarWrapper = styled(Box)(() => ({
  position: 'absolute',
  top: '-4rem',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 1,
}));

export const UserAvatarImage = styled('img')(({ theme }) => ({
  display: 'block',
  width: '8rem',
  height: '8rem',
  borderRadius: '50%',
  border: `4px solid ${theme.palette.common.white}`,
  boxShadow: '0 4px 20px 0 rgba(126, 87, 194, 0.35)',
  objectFit: 'cover',
}));

export const UserNameBlock = styled(Box)(() => ({
  textAlign: 'center',
  paddingTop: '4.5rem',
  paddingBottom: '1rem',
}));

export const UserName = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.4rem',
  color: theme.palette.secondary.main,
  lineHeight: 1.2,
}));

export const UserPosition = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: theme.palette.tertiary.main,
  marginTop: '0.25rem',
  fontWeight: 500,
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginBottom: '1rem',
  borderColor: `${theme.palette.tertiary.main}22`,
}));

export const UserInfoList = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.65rem',
}));

export const UserInfoRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.85rem',
  padding: '0.5rem 0.75rem',
  borderRadius: '0.5rem',
  transition: 'background 0.18s',
  '&:hover': {
    backgroundColor: `${theme.palette.tertiary.main}0f`,
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.tertiary.main,
    fontSize: '1.2rem',
    flexShrink: 0,
  },
}));

export const InfoText = styled(Typography)(({ theme }) => ({
  fontSize: '0.9rem',
  color: theme.palette.tertiary.main,
  wordBreak: 'break-word',
}));

export const LinkedInLink = styled('a')(({ theme }) => ({
  fontSize: '0.9rem',
  color: theme.palette.secondary.main,
  textDecoration: 'underline',
  wordBreak: 'break-word',
  '&:hover': {
    textDecoration: 'none',
    color: theme.palette.tertiary.main,
  },
}));

export const HeaderActionBox = styled(Box)(() => ({
  '& .MuiIconButton-root': {
    color: 'rgba(255,255,255,0.85)',
    '&:hover': {
      color: '#fff',
      backgroundColor: 'rgba(255,255,255,0.15)',
    },
  },
  '& .MuiSvgIcon-root': {
    color: 'inherit',
  },
}));

export const EditFormContent = styled(Box)(() => ({
  paddingTop: '1rem',
}));

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const EditFormWrapper = styled(Box)(({ theme }) => ({
  paddingTop: '0.5rem',

  '& .MuiInput-underline:before': {
    borderBottomColor: `${theme.palette.tertiary.main}44`,
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: theme.palette.secondary.main,
  },
  '& .MuiInputLabel-root': {
    color: `${theme.palette.tertiary.main}99`,
    fontSize: '0.82rem',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: theme.palette.secondary.main,
  },
  '& .MuiInputBase-input': {
    fontSize: '0.88rem',
    color: theme.palette.tertiary.main,
    paddingBottom: '4px',
  },

  '& .date-field .MuiOutlinedInput-notchedOutline': {
    borderColor: `${theme.palette.tertiary.main}44`,
  },
  '& .date-field:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.tertiary.main,
  },
  '& .date-field.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.secondary.main,
  },
  '& .date-field .MuiFormLabel-root': {
    color: `${theme.palette.tertiary.main}99`,
    fontSize: '0.82rem',
  },
  '& .date-field .MuiOutlinedInput-input': {
    fontSize: '0.88rem',
    color: theme.palette.tertiary.main,
    padding: '0.6rem 0.875rem',
  },

  '& .form-field-icon': {
    display: 'none',
  },
}));

export const EditFormTitle = styled(Typography)(({ theme }) => ({
  fontSize: '0.95rem',
  fontWeight: 600,
  color: theme.palette.secondary.main,
  marginBottom: theme.spacing(2),
  textAlign: 'center',
  letterSpacing: '0.03em',
  textTransform: 'uppercase',
}));

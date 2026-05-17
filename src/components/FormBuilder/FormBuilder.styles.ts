import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const FieldWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  position: 'relative',
  [theme.breakpoints.up('xl')]: {
    marginBottom: theme.spacing(3),
  },
}));

export const FormFieldIcon = styled(Box)(() => ({
  position: 'absolute',
  top: '1.2rem',
  left: '-2.5rem',
  '&.form-field-icon': {},
}));

export const PasswordIconWrapper = styled(Box)(() => ({
  position: 'absolute',
  top: '1.2rem',
  right: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiInputLabel-root': {
    color: theme.palette.tertiary.main,
  },
  '& .MuiInput-underline:before': {
    borderBottomColor: theme.palette.tertiary.main,
  },
  '& .password-input input': {
    paddingRight: '2.2rem',
  },
  '&.date-field .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.quinary.main,
  },
  '&.date-field .MuiFormLabel-root': {
    color: theme.palette.quinary.main,
  },
}));

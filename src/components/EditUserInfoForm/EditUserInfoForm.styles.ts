import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

export const EditFormWrapper = styled(Box)(({ theme }) => ({
  paddingTop: '0.5rem',

  // Override FormBuilder standard fields to look clean inside the card
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

  // Compact field spacing
  '& > .MuiBox-root': {
    marginBottom: theme.spacing(1.25),
  },

  // Date field overrides
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

  // Hide the absolute-positioned icons from FormBuilder (designed for login panel with padding)
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

export const FieldsGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  columnGap: '1.5rem',
}));

export const SaveButtonWrapper = styled(Box)(() => ({
  marginTop: '1rem',
  display: 'flex',
  justifyContent: 'center',
}));

export const EditFormSaveButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.common.white,
  padding: '0.5rem 2rem',
  borderRadius: '2rem',
  fontSize: '0.85rem',
  fontWeight: 600,
  letterSpacing: '0.04em',
  '&:hover': {
    backgroundColor: theme.palette.tertiary.main,
  },
  '& .MuiButton-startIcon .MuiSvgIcon-root': {
    color: theme.palette.common.white,
    fontSize: '1rem',
  },
}));

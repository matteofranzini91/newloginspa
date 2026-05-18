import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';
import { ColorScheme } from 'models/common.model';

interface StyledSelectProps {
  colorscheme: ColorScheme;
}

export const StyledSelect = styled(Select, {
  shouldForwardProp: (prop) => prop !== 'colorscheme',
})<StyledSelectProps>(({ theme, colorscheme }) => {
  const textColor = colorscheme === 'light' ? theme.palette.common.white : theme.palette.tertiary.main;
  const borderHoverColor = colorscheme === 'light' ? theme.palette.common.white : theme.palette.tertiary.main;

  return {
    color: `${textColor} !important`,
    '& .MuiSelect-icon': { color: `${textColor} !important` },
    '& .MuiSelect-select': { color: `${textColor} !important` },
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: borderHoverColor },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: borderHoverColor },
    fontSize: '0.85rem',
    fontWeight: 600,
  };
});

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  fontSize: '0.85rem',
  color: theme.palette.tertiary.main,
  '&.Mui-selected': {
    backgroundColor: theme.palette.tertiary.main,
    color: theme.palette.common.white,
    fontWeight: 700,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

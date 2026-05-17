import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import { styled } from '@mui/material/styles';

import { useLanguage } from '#Hooks/useLanguage';
import type { SupportedLanguage } from '#Providers/LanguageProvider/LanguageProvider';

type ColorScheme = 'light' | 'dark';

interface StyledSelectProps {
  colorscheme: ColorScheme;
}

const StyledSelect = styled(Select, {
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

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
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

const LANGUAGE_LABELS: Record<SupportedLanguage, string> = { es: 'ES', en: 'EN' };

interface LanguageSelectorProps {
  colorScheme?: ColorScheme;
}

const LanguageSelector = ({ colorScheme = 'light' }: LanguageSelectorProps) => {
  const { language, setLanguage, availableLanguages } = useLanguage();

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setLanguage(event.target.value as SupportedLanguage);
  };

  return (
    <StyledSelect
      value={language}
      onChange={handleChange}
      size="small"
      variant="outlined"
      colorscheme={colorScheme}
      renderValue={(value) => LANGUAGE_LABELS[value as SupportedLanguage]}
      MenuProps={{ disableScrollLock: true }}
    >
      {availableLanguages.map((lang) => (
        <StyledMenuItem key={lang} value={lang}>
          {LANGUAGE_LABELS[lang]}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  );
};

export default LanguageSelector;

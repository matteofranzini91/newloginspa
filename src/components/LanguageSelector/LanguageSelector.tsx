import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import { styled } from '@mui/material/styles';

import { useLanguage } from '#Hooks/useLanguage';
import type { SupportedLanguage } from '#Providers/LanguageProvider/LanguageProvider';

const StyledSelect = styled(Select)(({ theme }) => ({
  color: theme.palette.common.white,
  '& .MuiSelect-icon': { color: theme.palette.common.white },
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.palette.common.white },
  fontSize: '0.85rem',
}));

const LANGUAGE_LABELS: Record<SupportedLanguage, string> = { es: 'ES', en: 'EN' };

const LanguageSelector = () => {
  const { language, setLanguage, availableLanguages } = useLanguage();

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setLanguage(event.target.value as SupportedLanguage);
  };

  return (
    <StyledSelect value={language} onChange={handleChange} size="small" variant="outlined">
      {availableLanguages.map((lang) => (
        <MenuItem key={lang} value={lang}>
          {LANGUAGE_LABELS[lang]}
        </MenuItem>
      ))}
    </StyledSelect>
  );
};

export default LanguageSelector;

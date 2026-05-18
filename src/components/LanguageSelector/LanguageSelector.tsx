import type { SelectChangeEvent } from '@mui/material/Select';

import { useLanguage } from '#Hooks/useLanguage';
import { AVAILABLE_LANGUAGES } from 'constants/global';
import { ColorSchemes, SupportedLanguage } from 'models/common.model';
import React from 'react';
import { LanguageSelectorProps } from './LanguageSelector.model';
import { StyledMenuItem, StyledSelect } from './LanguageSelector.styles';

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ colorScheme = ColorSchemes.light }) => {
  const { language, setLanguage, availableLanguages } = useLanguage();
  const langs = Object.keys(availableLanguages);

  const handleChange = (event: SelectChangeEvent<unknown>) => setLanguage(event.target.value as SupportedLanguage);

  return (
    <StyledSelect
      value={language}
      onChange={handleChange}
      size="small"
      variant="outlined"
      colorscheme={colorScheme}
      renderValue={(value) => AVAILABLE_LANGUAGES[value as SupportedLanguage]}
      MenuProps={{ disableScrollLock: true }}
    >
      {langs.map((lang) => (
        <StyledMenuItem key={lang} value={lang}>
          {lang}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  );
};

export default LanguageSelector;

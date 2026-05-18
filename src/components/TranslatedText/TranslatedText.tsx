import Typography from '@mui/material/Typography';
import type { ElementType } from 'react';
import { useTranslation } from 'react-i18next';

import React from 'react';
import { TranslatedTextProps } from './TranslatedText.model';

export const TranslatedText: React.FC<TranslatedTextProps> = ({ i18nKey, values, variant, component, className }) => {
  const { t } = useTranslation();
  return (
    <Typography variant={variant} component={component ?? ('span' as ElementType)} className={className}>
      {t(i18nKey, values as Record<string, string>)}
    </Typography>
  );
};

import type { TypographyProps } from '@mui/material/Typography';
import type { ElementType } from 'react';

import type { I18nKey } from '#Config/i18n/i18n.types';

export interface TranslatedTextProps {
  i18nKey: I18nKey;
  values?: Record<string, string | number>;
  variant?: TypographyProps['variant'];
  component?: ElementType;
  className?: string;
}

import Typography from '@mui/material/Typography';
import type { TypographyProps } from '@mui/material/Typography';
import type { ElementType } from 'react';
import { useTranslation } from 'react-i18next';

import type { I18nKey } from '#Config/i18n/i18n.types';

export type TextProps = {
  i18nKey: I18nKey;
  values?: Record<string, string | number>;
  variant?: TypographyProps['variant'];
  component?: ElementType;
  className?: string;
};

const Text = ({ i18nKey, values, variant, component, className }: TextProps) => {
  const { t } = useTranslation();
  return (
    <Typography variant={variant} component={component ?? ('span' as ElementType)} className={className}>
      {t(i18nKey, values as Record<string, string>)}
    </Typography>
  );
};

export default Text;

import { useTranslation } from 'react-i18next';

import { CommonButton } from '#Components/CommonButton/CommonButton';

import type { FormFooterProps } from './FormFooter.model';
import { FooterText } from './FormFooter.styles';

export const FormFooter = ({ textKey, actionButton }: FormFooterProps) => {
  const { t } = useTranslation();

  return (
    <FooterText>
      {t(textKey)}
      <CommonButton i18nKey="footer.clickHere" onButtonClick={actionButton} />
    </FooterText>
  );
};

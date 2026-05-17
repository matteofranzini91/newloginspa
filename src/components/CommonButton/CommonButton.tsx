import { useTranslation } from 'react-i18next';

import type { CommonButtonProps } from './CommonButton.model';
import { LinkButton } from './CommonButton.styles';

const CommonButton = ({ i18nKey, onButtonClick }: CommonButtonProps) => {
  const { t } = useTranslation();
  return <LinkButton onClick={onButtonClick}>{t(i18nKey)}</LinkButton>;
};

export default CommonButton;

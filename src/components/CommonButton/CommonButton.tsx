import { TranslatedText } from 'components/TranslatedText/TranslatedText';
import type { CommonButtonProps } from './CommonButton.model';
import { LinkButton } from './CommonButton.styles';

export const CommonButton: React.FC<CommonButtonProps> = ({ i18nKey, onButtonClick }) => (
  <LinkButton onClick={onButtonClick}>
    <TranslatedText i18nKey={i18nKey} />
  </LinkButton>
);

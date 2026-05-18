import type { I18nKey } from '#Config/i18n/i18n.types';

export type CommonButtonProps = {
  i18nKey: I18nKey;
  onButtonClick: VoidFunction;
};

import type { I18nKey } from '#Config/i18n/i18n.types';

export type SubmitButtonProps = {
  textKey: I18nKey;
  loading: boolean;
  startIcon?: React.ReactElement;
};

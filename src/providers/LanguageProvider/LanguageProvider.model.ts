import { AVAILABLE_LANGUAGES } from 'constants/global';
import { SupportedLanguage } from 'models/common.model';

export interface LanguageContextValue {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  availableLanguages: typeof AVAILABLE_LANGUAGES;
}

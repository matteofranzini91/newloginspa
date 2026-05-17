import { createContext, memo, useCallback, useState } from 'react';
import type { PropsWithChildren } from 'react';

import i18n from '#Config/i18n/i18n';

export type SupportedLanguage = 'es' | 'en';

export interface LanguageContextValue {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  availableLanguages: SupportedLanguage[];
}

export const LanguageContext = createContext<LanguageContextValue | null>(null);

const AVAILABLE_LANGUAGES: SupportedLanguage[] = ['es', 'en'];

const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(
    (i18n.language as SupportedLanguage) ?? 'es',
  );

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, availableLanguages: AVAILABLE_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default memo(LanguageProvider);

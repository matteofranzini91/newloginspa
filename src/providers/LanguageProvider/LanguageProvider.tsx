import type { PropsWithChildren } from 'react';
import React, { createContext, memo, useCallback, useState } from 'react';

import i18n from '#Config/i18n/i18n';
import { AVAILABLE_LANGUAGES } from 'constants/global';
import { SupportedLanguage } from 'models/common.model';
import { LanguageContextValue } from './LanguageProvider.model';

export const LanguageContext = createContext<LanguageContextValue | null>(null);

const LanguageProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>((i18n.language as SupportedLanguage) ?? AVAILABLE_LANGUAGES.es);

  const setLanguage = useCallback((lang: SupportedLanguage) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
  }, []);

  return <LanguageContext.Provider value={{ language, setLanguage, availableLanguages: AVAILABLE_LANGUAGES }}>{children}</LanguageContext.Provider>;
};

export default memo(LanguageProvider);

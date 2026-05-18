import { AVAILABLE_LANGUAGES } from 'constants/global';

export type TypeWithKey<T> = { [key: string]: T };

export type SupportedLanguage = keyof typeof AVAILABLE_LANGUAGES;

export type ColorScheme = 'light' | 'dark';

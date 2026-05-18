import { AVAILABLE_LANGUAGES } from 'constants/global';

export type TypeWithKey<T> = { [key: string]: T };

export type SupportedLanguage = keyof typeof AVAILABLE_LANGUAGES;

export enum ColorSchemes {
  light = 'light',
  dark = 'dark',
}

export type ColorScheme = keyof typeof ColorSchemes;

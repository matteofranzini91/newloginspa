import type esCommon from './locales/es/common.json';

type PathsOf<T, Prefix extends string = ''> = T extends Record<string, unknown>
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends Record<string, unknown>
          ? PathsOf<T[K], Prefix extends '' ? K : `${Prefix}.${K}`>
          : Prefix extends ''
            ? K
            : `${Prefix}.${K}`
        : never;
    }[keyof T]
  : never;

export type I18nKey = PathsOf<typeof esCommon>;

import type { ApiError } from '#Models/errors.model';
import { describe, expect, it } from 'vitest';
import { mapErrorToI18nKey } from './errors.util';

describe('mapErrorToI18nKey', () => {
  it('maps INVALID_PASSWORD to the correct i18n key', () => {
    const error: ApiError = { code: 401, message: 'INVALID_PASSWORD' };
    expect(mapErrorToI18nKey(error)).toBe('errors.invalidPassword');
  });

  it('maps INVALID_USER to the correct i18n key', () => {
    const error: ApiError = { code: 401, message: 'INVALID_USER' };
    expect(mapErrorToI18nKey(error)).toBe('errors.invalidUser');
  });

  it('falls back to generic key for unknown error messages', () => {
    const error: ApiError = { code: 500, message: 'UNKNOWN_ERROR' };
    expect(mapErrorToI18nKey(error)).toBe('errors.generic');
  });

  it('falls back to generic key when message is empty', () => {
    const error: ApiError = { code: 500, message: '' };
    expect(mapErrorToI18nKey(error)).toBe('errors.generic');
  });
});

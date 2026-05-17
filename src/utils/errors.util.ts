import type { TypeWithKey } from '#Models/common.model';
import type { ApiError } from '#Models/errors.model';

export const mapErrorToI18nKey = (error: ApiError): string => {
  const errorMap: TypeWithKey<string> = {
    INVALID_PASSWORD: 'errors.invalidPassword',
    INVALID_USER: 'errors.invalidUser',
  };

  return errorMap[error.message] ?? 'errors.generic';
};

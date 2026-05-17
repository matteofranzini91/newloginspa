import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { httpService } from '#Services/http.service';
import { mapErrorToI18nKey } from '#Utils/errors.util';

const HttpErrorBinder = () => {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();

  useEffect(() => {
    httpService.setOnError((error) => {
      const i18nKey = mapErrorToI18nKey(error);
      enqueueSnackbar(t(i18nKey), { variant: 'error' });
    });

    return () => {
      httpService.setOnError(() => undefined);
    };
  }, [enqueueSnackbar, t]);

  return null;
};

export default HttpErrorBinder;

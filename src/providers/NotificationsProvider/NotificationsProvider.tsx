import { memo } from 'react';
import type { PropsWithChildren } from 'react';
import { SnackbarProvider } from 'notistack';

import HttpErrorBinder from './components/HttpErrorBinder';

const NotificationsProvider = ({ children }: PropsWithChildren) => (
  <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={5000}>
    <HttpErrorBinder />
    {children}
  </SnackbarProvider>
);

export default memo(NotificationsProvider);

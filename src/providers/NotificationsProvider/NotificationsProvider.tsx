import { SnackbarProvider } from 'notistack';
import type { PropsWithChildren } from 'react';
import { memo } from 'react';

import HttpErrorBinder from './components/HttpErrorBinder';

const NotificationsProvider = ({ children }: PropsWithChildren) => (
  <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={5000}>
    <HttpErrorBinder />
    {children}
  </SnackbarProvider>
);

export default memo(NotificationsProvider);

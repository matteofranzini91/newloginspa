import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import MainLayout from '#Layouts/MainLayout';
import AuthProvider from '#Providers/AuthProvider/AuthProvider';
import LanguageProvider from '#Providers/LanguageProvider/LanguageProvider';
import NotificationsProvider from '#Providers/NotificationsProvider/NotificationsProvider';
import AppRouter from '#Router/AppRouter';

export function App() {
  return (
    <NotificationsProvider>
      <LanguageProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AuthProvider>
            <MainLayout>
              <AppRouter />
            </MainLayout>
          </AuthProvider>
        </LocalizationProvider>
      </LanguageProvider>
    </NotificationsProvider>
  );
}

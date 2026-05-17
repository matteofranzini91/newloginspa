import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';

import { useAuth } from '#Hooks/useAuth';
import { useDeleteUserMutation } from '#Store/api/user.api';

export const useNavbar = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [deleteUser] = useDeleteUserMutation();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    auth.logout();
  };

  const handleDeleteUser = async () => {
    if (!auth.userId) return;
    try {
      await deleteUser(auth.userId).unwrap();
      enqueueSnackbar(t('user.delete.success'), { variant: 'success' });
      auth.logout();
    } catch {
    }
  };

  const settingsTooltip = t('user.settings');
  const deleteMenuLabel = t('user.delete.menuItem');
  const logoutMenuLabel = t('user.logout.menuItem');

  return {
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
    handleLogout,
    handleDeleteUser,
    settingsTooltip,
    deleteMenuLabel,
    logoutMenuLabel,
  };
};

import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const useUserCard = () => {
  const { t } = useTranslation();
  const [showEditForm, setShowEditForm] = useState(false);

  const handleOpenEditForm = () => setShowEditForm(true);
  const handleCloseEditForm = () => setShowEditForm(false);

  const editTooltip = t('user.edit.editTooltip');
  const backTooltip = t('user.edit.backTooltip');

  return { showEditForm, handleOpenEditForm, handleCloseEditForm, editTooltip, backTooltip };
};

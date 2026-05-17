import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Tooltip from '@mui/material/Tooltip';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { FormFieldProps } from '../FormBuilder.model';
import { FieldWrapper, FormFieldIcon, PasswordIconWrapper, StyledTextField } from '../FormBuilder.styles';

type PasswordType = 'password' | 'text';

const FormPasswordField = ({ value, label, name, onChange }: FormFieldProps) => {
  const { t } = useTranslation();
  const [passwordType, setPasswordType] = useState<PasswordType>('password');

  const toggleVisibility = () => setPasswordType((prev) => (prev === 'password' ? 'text' : 'password'));

  return (
    <FieldWrapper>
      <FormFieldIcon>
        <LockIcon />
      </FormFieldIcon>
      <StyledTextField
        label={label}
        onChange={onChange}
        required
        variant="standard"
        color="secondary"
        type={passwordType}
        value={value}
        fullWidth
        name={name}
        slotProps={{ input: { className: 'password-input' } }}
      />
      <PasswordIconWrapper onClick={toggleVisibility}>
        {passwordType === 'password' ? (
          <Tooltip title={t('fields.showPassword')}>
            <VisibilityIcon />
          </Tooltip>
        ) : (
          <Tooltip title={t('fields.hidePassword')}>
            <VisibilityOffIcon />
          </Tooltip>
        )}
      </PasswordIconWrapper>
    </FieldWrapper>
  );
};

export default memo(FormPasswordField, (prev: FormFieldProps, next: FormFieldProps) => prev.value === next.value);

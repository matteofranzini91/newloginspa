import EmailIcon from '@mui/icons-material/Email';
import React, { memo } from 'react';

import type { FormFieldProps } from '../FormBuilder.model';

import { FieldWrapper, FormFieldIcon, StyledTextField } from '../FormBuilder.styles';

const FormEmailField: React.FC<FormFieldProps> = ({ value, label, name, onChange }) => (
  <FieldWrapper>
    <FormFieldIcon className="form-field-icon">
      <EmailIcon />
    </FormFieldIcon>
    <StyledTextField
      label={label}
      onChange={onChange}
      required
      variant="standard"
      color="secondary"
      type="email"
      fullWidth
      value={value}
      name={name}
    />
  </FieldWrapper>
);

export default memo(FormEmailField, (prev: FormFieldProps, next: FormFieldProps) => prev.value === next.value);

import EmailIcon from '@mui/icons-material/Email';
import { memo } from 'react';

import type { FormFieldProps } from '../FormBuilder.model';

import { FieldWrapper, FormFieldIcon, StyledTextField } from '../FormBuilder.styles';

const FormEmailField = ({ value, label, name, onChange }: FormFieldProps) => (
  <FieldWrapper>
    <FormFieldIcon>
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

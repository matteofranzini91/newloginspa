import { memo } from 'react';

import type { FormFieldProps } from '../FormBuilder.model';

import { FieldWrapper, StyledTextField } from '../FormBuilder.styles';

const FormTextField = ({ value, label, name, onChange }: FormFieldProps) => (
  <FieldWrapper>
    <StyledTextField
      label={label}
      onChange={onChange}
      required
      variant="standard"
      color="secondary"
      type="text"
      fullWidth
      value={value}
      name={name}
    />
  </FieldWrapper>
);

export default memo(FormTextField, (prev: FormFieldProps, next: FormFieldProps) => prev.value === next.value);

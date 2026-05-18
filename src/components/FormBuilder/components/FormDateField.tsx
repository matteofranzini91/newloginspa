import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { type Dayjs } from 'dayjs';
import React, { memo, useMemo } from 'react';

import type { DateFieldEvent, FormFieldProps } from '../FormBuilder.model';
import { FieldWrapper } from '../FormBuilder.styles';

const FormDateField: React.FC<FormFieldProps> = ({ value, label, name, onChange }) => {
  const dayjsValue: Dayjs | null = useMemo(() => (value ? dayjs(value, 'DD/MM/YYYY') : null), [value]);

  const handleDateChange = (newValue: Dayjs | null) => {
    const event: DateFieldEvent = {
      target: {
        name,
        value: newValue ? newValue.format('DD/MM/YYYY') : null,
      },
    };
    onChange(event);
  };

  return (
    <FieldWrapper>
      <DatePicker
        label={label}
        value={dayjsValue}
        onChange={handleDateChange}
        format="DD/MM/YYYY"
        slotProps={{
          textField: { variant: 'outlined', color: 'secondary', fullWidth: true },
        }}
      />
    </FieldWrapper>
  );
};

export default memo(FormDateField, (prev: FormFieldProps, next: FormFieldProps) => prev.value === next.value);

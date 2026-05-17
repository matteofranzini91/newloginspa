import CircularProgress from '@mui/material/CircularProgress';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import type { SubmitButtonProps } from './SubmitButton.model';
import { StyledSubmitButton, SubmitButtonWrapper } from './SubmitButton.styles';

const SubmitButton = ({ textKey, loading }: SubmitButtonProps) => {
  const { t } = useTranslation();

  return (
    <SubmitButtonWrapper>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <StyledSubmitButton type="submit" variant="contained" disableElevation>
          {t(textKey)}
        </StyledSubmitButton>
      )}
    </SubmitButtonWrapper>
  );
};

export default memo(SubmitButton);

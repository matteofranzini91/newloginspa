import CircularProgress from '@mui/material/CircularProgress';
import { memo } from 'react';

import { TranslatedText } from 'components/TranslatedText/TranslatedText';
import type { SubmitButtonProps } from './SubmitButton.model';
import { StyledSubmitButton, SubmitButtonWrapper } from './SubmitButton.styles';

const SubmitButton = ({ textKey, loading, startIcon }: SubmitButtonProps) => (
  <SubmitButtonWrapper>
    {loading ? (
      <CircularProgress color="secondary" />
    ) : (
      <StyledSubmitButton type="submit" variant="contained" disableElevation startIcon={startIcon}>
        <TranslatedText i18nKey={textKey} />
      </StyledSubmitButton>
    )}
  </SubmitButtonWrapper>
);

export default memo(SubmitButton);

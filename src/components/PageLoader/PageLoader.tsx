import CircularProgress from '@mui/material/CircularProgress';
import { LoaderWrapper } from './PageLoader.styles';

export const PageLoader = () => (
  <LoaderWrapper>
    <CircularProgress color="secondary" />
  </LoaderWrapper>
);

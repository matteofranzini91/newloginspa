import CircularProgress from '@mui/material/CircularProgress';
import { LoaderWrapper } from './PageLoader.styles';

const PageLoader = () => (
  <LoaderWrapper>
    <CircularProgress color="secondary" />
  </LoaderWrapper>
);

export default PageLoader;

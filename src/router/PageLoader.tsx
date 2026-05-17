import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const LoaderWrapper = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
}));

const PageLoader = () => (
  <LoaderWrapper>
    <CircularProgress color="secondary" />
  </LoaderWrapper>
);

export default PageLoader;

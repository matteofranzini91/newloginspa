import Container from '@mui/material/Container';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import { NavbarSkeletonWrapper } from '../Navbar.styles';

const NavbarSkeleton = () => (
  <NavbarSkeletonWrapper>
    <Container maxWidth="xl">
      <Stack>
        <Skeleton variant="circular" width={50} height={50} />
        <Skeleton variant="circular" width={50} height={50} />
      </Stack>
    </Container>
  </NavbarSkeletonWrapper>
);

export default NavbarSkeleton;

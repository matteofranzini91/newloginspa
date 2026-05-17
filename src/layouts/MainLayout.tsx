import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import { styled } from '@mui/material/styles';
import type { PropsWithChildren } from 'react';
import { memo } from 'react';

import Navbar from '#Components/Navbar/Navbar';
import { useAuth } from '#Hooks/useAuth';
import { useGetUserByIdQuery } from '#Store/api/user.api';

const LayoutContainer = styled(Box)(() => ({
  minHeight: '100%',
}));

const MainLayout = ({ children }: PropsWithChildren) => {
  const auth = useAuth();

  useGetUserByIdQuery(auth.userId as number, { skip: !auth.userId });

  return (
    <LayoutContainer>
      <Fade in={auth.logged} timeout={{ enter: 500, exit: 300 }} unmountOnExit>
        <div>
          <Navbar />
        </div>
      </Fade>
      {children}
    </LayoutContainer>
  );
};

export default memo(MainLayout);

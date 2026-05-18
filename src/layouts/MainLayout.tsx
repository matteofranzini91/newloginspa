import Fade from '@mui/material/Fade';
import type { PropsWithChildren } from 'react';
import React, { memo } from 'react';

import Navbar from '#Components/Navbar/Navbar';
import { useAuth } from '#Hooks/useAuth';
import { useGetUserByIdQuery } from '#Store/api/user.api';
import Box from '@mui/material/Box';
import { LayoutContainer } from './MainLayout.styles';

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuth();

  useGetUserByIdQuery(auth.userId as number, { skip: !auth.userId });

  return (
    <LayoutContainer>
      <Fade in={auth.logged} timeout={{ enter: 500, exit: 300 }} unmountOnExit>
        <Box>
          <Navbar />
        </Box>
      </Fade>
      {children}
    </LayoutContainer>
  );
};

export default memo(MainLayout);

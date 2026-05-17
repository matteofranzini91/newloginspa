import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { memo } from 'react';
import type { PropsWithChildren } from 'react';

import Navbar from '#Components/Navbar/Navbar';
import { useAuth } from '#Hooks/useAuth';
import { useGetUserByIdQuery } from '#Store/api/user.api';

const LayoutContainer = styled(Box)(() => ({
  minHeight: '100%',
  overflow: 'hidden',
}));

const MainLayout = ({ children }: PropsWithChildren) => {
  const auth = useAuth();

  useGetUserByIdQuery(auth.userId as number, { skip: !auth.userId });

  return (
    <LayoutContainer>
      {auth.logged && <Navbar />}
      {children}
    </LayoutContainer>
  );
};

export default memo(MainLayout);

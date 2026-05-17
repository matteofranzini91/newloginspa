import UserCard from '#Components/UserCard/UserCard';
import UserCardSkeleton from '#Components/UserCard/components/UserCardSkeleton';
import { useAuth } from '#Hooks/useAuth';
import { useGetUserByIdQuery } from '#Store/api/user.api';
import Fade from '@mui/material/Fade';

import { CardWrapper, WelcomeContainer } from './Welcome.styles';

const Welcome = () => {
  const { userId } = useAuth();
  const { data: user, isLoading } = useGetUserByIdQuery(userId as number, { skip: !userId });

  return (
    <Fade in timeout={400}>
      <WelcomeContainer maxWidth="xl">
        <CardWrapper>{isLoading || !user ? <UserCardSkeleton /> : <UserCard user={user} />}</CardWrapper>
      </WelcomeContainer>
    </Fade>
  );
};

export default Welcome;

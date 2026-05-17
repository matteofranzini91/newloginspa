import UserCard from '#Components/UserCard/UserCard';
import UserCardSkeleton from '#Components/UserCard/components/UserCardSkeleton';
import { useAuth } from '#Hooks/useAuth';
import { useGetUserByIdQuery } from '#Store/api/user.api';

import { CardWrapper, WelcomeContainer } from './Welcome.styles';

const Welcome = () => {
  const { userId } = useAuth();
  const { data: user, isLoading } = useGetUserByIdQuery(userId as number, { skip: !userId });

  return (
    <WelcomeContainer maxWidth="xl">
      <CardWrapper>{isLoading || !user ? <UserCardSkeleton /> : <UserCard user={user} />}</CardWrapper>
    </WelcomeContainer>
  );
};

export default Welcome;

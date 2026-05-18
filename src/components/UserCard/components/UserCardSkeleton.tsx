import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Skeleton from '@mui/material/Skeleton';
import { CenteredStack } from './UserCardSkeleton.styles';

export const UserCardSkeleton = () => (
  <Card>
    <CardContent>
      <CenteredStack spacing={1}>
        <Skeleton variant="circular" width={100} height={100} />
        <Skeleton variant="rounded" width="80%" height={40} />
        <Skeleton variant="rounded" width="80%" height={40} />
        <Skeleton variant="rounded" width="80%" height={40} />
        <Skeleton variant="rounded" width="80%" height={40} />
        <Skeleton variant="rounded" width="80%" height={40} />
        <Skeleton variant="rounded" width="80%" height={40} />
      </CenteredStack>
    </CardContent>
  </Card>
);

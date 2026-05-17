import CakeIcon from '@mui/icons-material/Cake';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

import EditUserInfoForm from '#Components/EditUserInfoForm/EditUserInfoForm';

import type { UserCardProps } from './UserCard.model';
import { BlockTypography, CenteredText, LinkedInLink, UserAvatarImage, UserCardRoot, UserInfoRow } from './UserCard.styles';
import { useUserCard } from './hooks/useUserCard';

const UserCard = ({ user }: UserCardProps) => {
  const { showEditForm, handleOpenEditForm, handleCloseEditForm, editTooltip, backTooltip } = useUserCard();

  return (
    <UserCardRoot>
      <CardContent>
        <CardHeader
          action={
            <IconButton aria-label="settings">
              {showEditForm ? (
                <Tooltip title={backTooltip}>
                  <KeyboardBackspaceIcon onClick={handleCloseEditForm} />
                </Tooltip>
              ) : (
                <Tooltip title={editTooltip}>
                  <EditIcon onClick={handleOpenEditForm} />
                </Tooltip>
              )}
            </IconButton>
          }
        />
        {user.avatar && <UserAvatarImage src={user.avatar} alt={user.name} />}
        {showEditForm ? (
          <EditUserInfoForm onClose={handleCloseEditForm} />
        ) : (
          <>
            <CenteredText>
              <Typography variant="h5">{`${user.name} ${user.surname}`}</Typography>
              <BlockTypography>{`${user.company.position} en ${user.company.name}`}</BlockTypography>
            </CenteredText>
            <UserInfoRow>
              <CakeIcon />
              <Typography>{user.birthday}</Typography>
            </UserInfoRow>
            <UserInfoRow>
              <EmailIcon />
              <Typography>{user.email}</Typography>
            </UserInfoRow>
            <UserInfoRow>
              <PhoneAndroidIcon />
              <Typography>{user.phone}</Typography>
            </UserInfoRow>
            <UserInfoRow>
              <LinkedInIcon />
              <LinkedInLink href={user.website} target="_blank" rel="noopener noreferrer">
                {user.website}
              </LinkedInLink>
            </UserInfoRow>
          </>
        )}
      </CardContent>
    </UserCardRoot>
  );
};

export default UserCard;

import CakeIcon from '@mui/icons-material/Cake';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import EditUserInfoForm from '#Components/EditUserInfoForm/EditUserInfoForm';

import type { UserCardProps } from './UserCard.model';
import {
  AvatarWrapper,
  EditFormContent,
  HeaderActionBox,
  InfoText,
  LinkedInLink,
  StyledDivider,
  UserAvatarImage,
  UserCardBody,
  UserCardHeader,
  UserCardRoot,
  UserInfoList,
  UserInfoRow,
  UserName,
  UserNameBlock,
  UserPosition,
} from './UserCard.styles';
import { useUserCard } from './hooks/useUserCard';

const UserCard = ({ user }: UserCardProps) => {
  const { showEditForm, handleOpenEditForm, handleCloseEditForm, editTooltip, backTooltip } = useUserCard();

  return (
    <UserCardRoot>
      <UserCardHeader>
        <HeaderActionBox>
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
        </HeaderActionBox>
      </UserCardHeader>

      <UserCardBody>
        {!showEditForm && user.avatar && (
          <AvatarWrapper>
            <UserAvatarImage src={user.avatar} alt={user.name} />
          </AvatarWrapper>
        )}

        {showEditForm ? (
          <EditFormContent>
            <EditUserInfoForm onClose={handleCloseEditForm} />
          </EditFormContent>
        ) : (
          <>
            <UserNameBlock>
              <UserName>{`${user.name} ${user.surname}`}</UserName>
              <UserPosition>{`${user.company.position} · ${user.company.name}`}</UserPosition>
            </UserNameBlock>

            <StyledDivider />

            <UserInfoList>
              <UserInfoRow>
                <CakeIcon />
                <InfoText>{user.birthday}</InfoText>
              </UserInfoRow>
              <UserInfoRow>
                <EmailIcon />
                <InfoText>{user.email}</InfoText>
              </UserInfoRow>
              <UserInfoRow>
                <PhoneAndroidIcon />
                <InfoText>{user.phone}</InfoText>
              </UserInfoRow>
              <UserInfoRow>
                <LinkedInIcon />
                <LinkedInLink href={user.website} target="_blank" rel="noopener noreferrer">
                  {user.website}
                </LinkedInLink>
              </UserInfoRow>
            </UserInfoList>
          </>
        )}
      </UserCardBody>
    </UserCardRoot>
  );
};

export default UserCard;

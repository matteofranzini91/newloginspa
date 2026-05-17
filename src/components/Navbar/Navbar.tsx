import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';

import logo from '#Assets/images/logo.png';
import LanguageSelector from '#Components/LanguageSelector/LanguageSelector';
import { useAuth } from '#Hooks/useAuth';
import { useGetUserByIdQuery } from '#Store/api/user.api';

import NavbarSkeleton from './components/NavbarSkeleton';
import { MenuItemText, NavbarLogo, StyledNavbar, UserMenuBox } from './Navbar.styles';
import { useNavbar } from './hooks/useNavbar';

const Navbar = () => {
  const { userId } = useAuth();
  const { data: user, isLoading } = useGetUserByIdQuery(userId as number, { skip: !userId });
  const {
    anchorElUser,
    handleOpenUserMenu,
    handleCloseUserMenu,
    handleLogout,
    handleDeleteUser,
    settingsTooltip,
    deleteMenuLabel,
    logoutMenuLabel,
  } = useNavbar();

  if (isLoading) {
    return <NavbarSkeleton />;
  }

  return (
    <StyledNavbar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <NavbarLogo src={logo} alt="Logo" />
          <UserMenuBox>
            <LanguageSelector />
            <Tooltip title={settingsTooltip}>
              <IconButton onClick={handleOpenUserMenu}>
                <Avatar alt={user?.name ?? ''} src={user?.avatar ?? ''} />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              slotProps={{ paper: { sx: { mt: '45px' } } }}
            >
              <MenuItem onClick={handleDeleteUser}>
                <MenuItemText>{deleteMenuLabel}</MenuItemText>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <MenuItemText>{logoutMenuLabel}</MenuItemText>
              </MenuItem>
            </Menu>
          </UserMenuBox>
        </Toolbar>
      </Container>
    </StyledNavbar>
  );
};

export default Navbar;

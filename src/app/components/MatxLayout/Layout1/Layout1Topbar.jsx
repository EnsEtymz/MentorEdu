import { memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Avatar,
  Hidden,
  Icon,
  IconButton,
  MenuItem,
  useMediaQuery,
  Box,
  styled,
  useTheme,
  Button,
} from '@mui/material';

import { MatxMenu, MatxSearchBox } from 'app/components';
import { themeShadows } from 'app/components/MatxTheme/themeColors';
import { NotificationProvider } from 'app/contexts/NotificationContext';
import useSettings from 'app/hooks/useSettings';
import { topBarHeight } from 'app/utils/constant';

import { Span } from '../../Typography';
import NotificationBar from '../../NotificationBar/NotificationBar';
import ShoppingCart from '../../ShoppingCart';
import { useUser } from '../../../contexts/UserContext';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary
}));

const TopbarRoot = styled('div')({
  top: 0,
  zIndex: 96,
  height: topBarHeight,
  boxShadow: themeShadows[8],
  transition: 'all 0.3s ease'
});

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16
  }
}));

const UserMenu = styled(Box)({
  padding: 4,
  display: 'flex',
  borderRadius: 24,
  cursor: 'pointer',
  alignItems: 'center',
  '& span': { margin: '0 8px' }
});

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 185,
  '& a': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none'
  },
  '& span': { marginRight: '10px', color: theme.palette.text.primary }
}));

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: { display: 'none !important' }
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { user, logout } = useUser();
  const logoutbutton = () => {
    navigate('/dashboard/default')
    logout();

  }
  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({ layout1Settings: { leftSidebar: { ...sidebarSettings } } });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
    }
    updateSidebarMode({ mode });
  };
  const navigate = useNavigate();
  const routeLogin = () => {
    navigate('/session/signin')
  }

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Icon>menu</Icon>
          </StyledIconButton>

          <IconBox>
            <StyledIconButton>
              <Icon>mail_outline</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>web_asset</Icon>
            </StyledIconButton>

            <StyledIconButton>
              <Icon>star_outline</Icon>
            </StyledIconButton>
          </IconBox>
        </Box>

        <Box display="flex" alignItems="center">
          <MatxSearchBox />

          <NotificationProvider>
            <NotificationBar />
          </NotificationProvider>

          <ShoppingCart />
          {user?.username ?
            <MatxMenu
              menuButton={
                <UserMenu>
                  <Hidden xsDown>
                    <Span>
                      <p>Merhaba <strong>{user?.username || 'Kullanıcı'}</strong></p>

                    </Span>
                  </Hidden>
                  <Avatar src={user.avatar} sx={{ cursor: 'pointer' }} />
                </UserMenu>
              }
            >
              <StyledItem>
                <Link to="/">
                  <Icon> home </Icon>
                  <Span> Home </Span>
                </Link>
              </StyledItem>

              <StyledItem>
                <Link to="/page-layouts/user-profile">
                  <Icon> person </Icon>
                  <Span> Profile </Span>
                </Link>
              </StyledItem>

              <StyledItem>
                <Icon> settings </Icon>
                <Span> Settings </Span>
              </StyledItem>
              {user !== '' && (
                <StyledItem onClick={logoutbutton}>
                  <Icon> power_settings_new </Icon>
                  <Span> Logout </Span>
                </StyledItem>
              )}

            </MatxMenu>
            :

            <Button onClick={routeLogin} style={{ color: 'black', border: '1px solid black', borderRadius: '5px ,5px ', marginLeft: 5 }} >
              <strong>Giriş Yap</strong>
            </Button>

          }

        </Box>
      </TopbarContainer>
    </TopbarRoot>
  );
};

export default memo(Layout1Topbar);

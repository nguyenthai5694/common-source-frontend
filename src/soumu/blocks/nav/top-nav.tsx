// import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
// import BellIcon from '@heroicons/react/24/solid/BellIcon';
// import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
// import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
// import { usePopover } from 'src/hooks/use-popover';
import React from 'react'
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import ContactsIcon from '@mui/icons-material/Contacts';
import SearchIcon from '@mui/icons-material/Search';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
// import { AccountPopover } from './account-popover';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export default function TopNav(props) {
  // const { onNavOpen } = props;
  // const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
  // const accountPopover = usePopover();

  return (
    <>
      <Box
        component='header'
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems='center'
          direction='row'
          justifyContent='space-between'
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack
            alignItems='center'
            direction='row'
            spacing={2}
          >
            {/* {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize='small'>
                </SvgIcon>
              </IconButton>
            )} */}

            <Tooltip title='Search'>
              <IconButton>
                <SvgIcon fontSize='small'>
                  <SearchIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
          </Stack>

          <Stack
            alignItems='center'
            direction='row'
            spacing={2}
          >
            <Tooltip title='Contacts'>
              <IconButton>
                <SvgIcon fontSize='small'>
                  <ContactsIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>

            <Tooltip title='Notifications'>
              <IconButton>
                <Badge
                  badgeContent={4}
                  color='success'
                  variant='dot'
                >
                  <SvgIcon fontSize='small'>
                    <CircleNotificationsIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>

            <Avatar

              sx={{
                cursor: 'pointer',
                height: 40,
                width: 40,
              }}
              src='/assets/avatars/avatar-anika-visser.png'
            />
          </Stack>
        </Stack>
      </Box>

      {/* <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      /> */}
    </>
  );
};


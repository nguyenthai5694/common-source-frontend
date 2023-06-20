import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import {
  Avatar,
  Box,
  Link,
  Stack,
  Tooltip,
} from '@mui/material';
import { useRouter } from 'app/modules/routes';
import Logo from '../layout/logo/logo';
import { items } from './config';
// import { Scrollbar } from './scrollbar';
import SideNavItem from './side-nav-item';

export default function SideNav(props) {
  const router = useRouter();
  const pathname = router.pathname;

  const logout = () => {
    window.localStorage.removeItem('token')
    router.push('/auth/login')
  }

  // const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

  const content = (
    <Box
      sx={{
        '& .simplebar-content': {
          height: '100%',
        },
        '& .simplebar-scrollbar:before': {
          background: '#101D64',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        <Box sx={{ p: 3 }}>
          <Link  >
            <Logo />
          </Link>
        </Box>

      </Box>

      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Box sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          position: 'relative',
        }}>
          <Avatar>
            <PersonIcon />
          </Avatar>

          User Name
        </Box>

        <Box sx={{
          cursor: 'pointer',
        }}
        >
          <Tooltip title='Log Out' onClick={logout}>
            <LogoutIcon />
          </Tooltip>

        </Box>
      </Box>

      <Box
        component='nav'
        sx={{
          flexGrow: 1,
          px: 2,
          py: 3,
        }}
      >
        <Stack
          component='ul'
          spacing={0.5}
          sx={{
            listStyle: 'none',
            p: 0,
            m: 0,
          }}
        >
          {items.map((item: any) => {
            let active = item.path ? (pathname === item.path) : false;

            if (!active && item.children) {
              const subMenuActive = item.children.find(e => e.path === pathname)

              active = subMenuActive ? true : false;
            }

            return (
              <SideNavItem
                active={active}
                disabled={item?.disabled}
                external={item?.external}
                icon={item.icon}
                key={item.title}
                path={item.path}
                title={item.title}
                children={item.children}
              />
            );
          })}
        </Stack>
      </Box>

    </Box >
  );

  return (
    <div className='main-menu'>

      {content}
    </div>
  );
};


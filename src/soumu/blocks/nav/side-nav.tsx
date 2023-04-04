import React from 'react'
import CropSquareIcon from '@mui/icons-material/CropSquare';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import {
  Box,
  Button,
  Divider,
  Link,
  Stack,
  SvgIcon,
  Typography,
} from '@mui/material';
import Logo from '../layout/logo/logo';
import { items } from './config';
// import { Scrollbar } from './scrollbar';
import SideNavItem from './side-nav-item';

export default function SideNav(props) {
  const pathname = '/dashboard';
  // const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

  const content = (
    <Box
      sx={{
        '& .simplebar-content': {
          height: '100%',
        },
        '& .simplebar-scrollbar:before': {
          background: 'neutral.400',
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

        <Box
          sx={{
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            borderRadius: 1,
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
            mt: 2,
            p: '12px',
          }}
        >
          <div>
            <Typography
              color='inherit'
              variant='subtitle1'
            >
              Devias
            </Typography>

            <Typography
              color='neutral.400'
              variant='body2'
            >
              Production
            </Typography>
          </div>

          <SvgIcon
            fontSize='small'
            sx={{ color: 'neutral.500' }}
          >
            <UnfoldMoreIcon />
          </SvgIcon>
        </Box>
      </Box>

      <Divider sx={{ borderColor: 'neutral.700' }} />

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
            const active = item.path ? (pathname === item.path) : false;

            return (
              <SideNavItem
                active={active}
                disabled={item?.disabled}
                external={item?.external}
                icon={item.icon}
                key={item.title}
                path={item.path}
                title={item.title}
              />
            );
          })}
        </Stack>
      </Box>

      <Divider sx={{ borderColor: 'neutral.700' }} />

      <Box
        sx={{
          px: 2,
          py: 3,
        }}
      >
        <Typography
          color='neutral.100'
          variant='subtitle2'
        >
          Need more features?
        </Typography>

        <Typography
          color='neutral.500'
          variant='body2'
        >
          Check out our Pro solution template.
        </Typography>

        <Box
          sx={{
            display: 'flex',
            mt: 2,
            mx: 'auto',
            width: '160px',
            '& img': {
              width: '100%',
            },
          }}
        >
          <img
            alt='Go to pro'
            src='/assets/devias-kit-pro.png'
          />
        </Box>

        <Button
          component='a'
          endIcon={(
            <SvgIcon fontSize='small'>
              <CropSquareIcon />
            </SvgIcon>
          )}
          fullWidth
          href='https://material-kit-pro-react.devias.io/'
          sx={{ mt: 2 }}
          target='_blank'
          variant='contained'
        >
          Pro Live Preview
        </Button>
      </Box>
    </Box >
  );

  // if (lgUp) {
  //   return (
  //     <Drawer
  //       anchor='left'
  //       open
  //       PaperProps={{
  //         sx: {
  //           backgroundColor: 'neutral.800',
  //           color: 'common.white',
  //           width: 280,
  //         },
  //       }}
  //       variant='permanent'
  //     >
  //       {content}
  //     </Drawer>
  //   );
  // }

  return (
    <div className='main-menu'>

      {content}
    </div>
  );
};


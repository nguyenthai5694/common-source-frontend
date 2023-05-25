import React from 'react'
import CancelIcon from '@mui/icons-material/Cancel';
import GroupIcon from '@mui/icons-material/Group';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SignalCellularAltIcon from '@mui/icons-material/SignalCellularAlt';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Dashboard',
    path: '/',
    icon: (
      <SvgIcon fontSize='small'>
        <SignalCellularAltIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Customers',
    path: '/customers',
    icon: (
      <SvgIcon fontSize='small'>
        <GroupIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Companies',
    path: '/companies',
    icon: (
      <SvgIcon fontSize='small'>
        <ShoppingBagIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Users',
    path: '/setting/users',
    icon: (
      <SvgIcon fontSize='small'>
        <PersonIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: (
      <SvgIcon fontSize='small'>
        <SettingsIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Login',
    path: '/auth/login',
    icon: (
      <SvgIcon fontSize='small'>
        <LockIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Register',
    path: '/auth/register',
    icon: (
      <SvgIcon fontSize='small'>
        <PersonAddIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Error',
    path: '/404',
    icon: (
      <SvgIcon fontSize='small'>
        <CancelIcon />
      </SvgIcon>
    ),
  },
  {
    title: 'Demo',
    path: '/demo',
    icon: (
      <SvgIcon fontSize='small'>
        <CancelIcon />
      </SvgIcon>
    ),
    children: [
      {
        title: 'Demo',
        path: '/demo',
      },
    ],
  },
  {
    title: 'Setting',
    path: '',
    icon: (
      <SvgIcon fontSize='small'>
        <CancelIcon />
      </SvgIcon>
    ),
    children: [
      {
        title: 'Menu',
        path: '/setting/menu',
      },
    ],
  },
];

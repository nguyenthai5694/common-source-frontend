/* eslint-disable max-lines */
import React from 'react';
import { Routes } from 'app/services/route';

export const pagesRoutes: Routes = [
  {
    id: 'dashboard',
    path: '/',
    exact: true,
    component: React.lazy(() => import('app/modules/pages/dashboard/dashboard.component')),
  },
  {
    id: 'inventory-calendar',
    path: 'inventory-calendar',
    exact: true,
    component: React.lazy(() => import('app/modules/pages/inventory-calendar/inventory-calendar.component')),
  },
  {
    id: 'inventory-calendar2',
    path: 'inventory-calendar2',
    exact: true,
    component: React.lazy(() => import('app/modules/pages/inventory-calendar2/inventory-calendar2.component')),
  },
  {
    id: 'inventory-calendar3',
    path: 'inventory-calendar3',
    exact: true,
    component: React.lazy(() => import('app/modules/pages/inventory-calendar3/inventory-calendar3.component')),
  },
  {
    id: 'menu-setting',
    path: 'setting/menu',
    exact: true,
    component: React.lazy(() => import('app/modules/pages/settings/menu/setting-menu.component')),
  },
  {
    id: 'users-setting',
    path: 'setting/users',
    exact: true,
    component: React.lazy(() => import('app/modules/pages/settings/users/setting-users.component')),
  },
  {
    id: 'add-user',
    path: 'setting/add-user',
    exact: true,
    component: React.lazy(() => import('app/modules/pages/settings/users/components/add-user/add-user.component')),
  },
]

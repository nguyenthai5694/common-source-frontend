/* eslint-disable max-lines */
import React from 'react';
import { Routes } from 'app/services/route';

export const pagesRoutes: Routes = [
  {
    id: 'demo',
    path: 'demo',
    exact: true,
    component: React.lazy(() => import('app/modules/pages/demo/demo.component')),
  },
  {
    id: 'menu-setting',
    path: 'setting/menu',
    exact: true,
    component: React.lazy(() => import('app/modules/pages/settings/menu/setting-menu.component')),
  },
]

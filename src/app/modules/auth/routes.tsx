import React from 'react';
import { Routes } from 'app/services/route';

export const authRoutes: Routes = [
  {
    path: 'login',
    exact: true,
    component: React.lazy(() => import('app/modules/auth/login/login.component')),
  },
  {
    path: 'forbidden',
    exact: true,
    component: React.lazy(() => import('app/modules/auth/forbidden/forbidden.component')),
  },
];
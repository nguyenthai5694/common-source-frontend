/* eslint-disable max-lines */
import React from 'react';
import { Routes } from 'app/services/route';

export const mimRoutes: Routes = [
  {
    id: 'dashboard',
    path: 'dashboard',
    exact: true,
    component: React.lazy(() => import('app/modules/mim/dashboard/dashboard.component')),
  },
]

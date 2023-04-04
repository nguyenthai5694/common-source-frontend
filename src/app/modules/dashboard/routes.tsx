import React from 'react';
import { Routes } from 'app/services/route';

export const dashboardRoutes: Routes = [
  {
    path: '',
    exact: true,
    component: React.lazy(() => import('app/modules/dashboard/default-dashboard/dashboard.component')),
  },
];
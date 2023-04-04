/* eslint-disable max-lines */
import React from 'react';
import { Routes } from 'app/services/route';

export const examplesRoutes: Routes = [
  {
    id: 'input',
    path: 'input',
    exact: true,
    component: React.lazy(() => import('app/modules/examples/input/input.component')),
  },
]

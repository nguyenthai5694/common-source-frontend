import React from 'react';
import { Routes } from 'app/services/route';

export const exampleFormRoutes: Routes = [
  {
    path: 'formik-form',
    exact: true,
    component: React.lazy(() => import('app/modules/form-validation-example/formik/formik-example.component')),
  },
  {
    path: 'simple-form',
    exact: true,
    component: React.lazy(() => import('app/modules/form-validation-example/formik/simple-form-example.component')),
  },
  {
    path: 'page',
    exact: true,
    component: React.lazy(() => import('app/modules/form-validation-example/formik/example.component')),
  },
]

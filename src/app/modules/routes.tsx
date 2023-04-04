
import NormalLayout from 'soumu/blocks/layout/normal-layout/normal-layout.component'
import { AuthenGuard } from 'app/services/auth'
import { Routes } from 'app/services/route'
import { authRoutes } from 'app/modules/auth/routes'
import { exampleFormRoutes } from 'app/modules/form-validation-example/formik/routes'
import { pagesRoutes } from 'app/modules/pages/routes';
import { dashboardRoutes } from './dashboard/routes'
import { examplesRoutes } from './examples/routes'

export const appRoutes: Routes = [
  {
    path: 'auth',
    children: authRoutes,
  },
  {
    path: 'formik-sample',
    component: NormalLayout,
    children: exampleFormRoutes,
  },
  {
    path: 'examples',
    component: NormalLayout,
    children: examplesRoutes,
  },
  {
    path: '',
    middlewares: [AuthenGuard],
    component: NormalLayout,
    children: [
      {
        path: '',
        children: pagesRoutes,
      },
      {
        path: 'dashboard',
        children: dashboardRoutes,
      },
    ],
  },
]

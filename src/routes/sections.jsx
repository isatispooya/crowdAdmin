/* eslint-disable import/no-unresolved */
import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const Sterpercrowd = lazy(() => import('src/components/sterpercrowd'));
export const RequestPage = lazy(() => import('src/pages/request'));
export const PlansPage = lazy(() => import('src/module/paln/page/plansPage'));
export const PlanDetailPage = lazy(() => import('src/module/paln/page/planDetail'));
export const UserPage = lazy(() => import('src/components/user'));
export const PaymentPage = lazy(() => import('src/components/payment'));
export const ProfilePage = lazy(() => import('src/pages/profile'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ProcessProjectPage = lazy(() => import('src/pages/processProject'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'card', element: <Sterpercrowd /> },
        { path: 'request', element: <UserPage /> },
        { path: 'process', element: <ProcessProjectPage /> },
        { path: 'ProfilePage', element: <ProfilePage /> },
        { path: 'plans', element: <PlansPage /> },
        { path: '/plan/:id', element: <PlanDetailPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'payment', element: <PaymentPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    { path: 'request', element: <RequestPage /> },

    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

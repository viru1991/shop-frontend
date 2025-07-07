import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// import { GuestGuard } from 'src/auth/guard';
import CompactLayout from 'src/layouts/compact';
import AuthClassicLayout from 'src/layouts/auth/classic';

import { SplashScreen } from 'src/components/loading-screen';

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/login'));
const JwtRegisterPage = lazy(() => import('src/pages/auth/register'));


const login = {
  path:'login',
  element: (
    // <GuestGuard>
      <AuthClassicLayout>
        <JwtLoginPage />
      </AuthClassicLayout>
    // </GuestGuard>
  ),
}

const register = {
  path:'register',
  element: (
    // <GuestGuard>
      <AuthClassicLayout title="Manage the job more effectively with Minimal">
        <JwtRegisterPage />
      </AuthClassicLayout>
    // </GuestGuard>
  ),
}
const authJwt = {
  path: 'jwt',
  element: (
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      path: 'login',
      element: (
        // <GuestGuard>
          <AuthClassicLayout>
            <JwtLoginPage />
          </AuthClassicLayout>
        // </GuestGuard>
      ),
    },
    {
      path: 'register',
      element: (
        // <GuestGuard>
          <AuthClassicLayout title="Manage the job more effectively with Minimal">
            <JwtRegisterPage />
          </AuthClassicLayout>
        // </GuestGuard>
      ),
    },
  ],
};



export const authRoutes = [
  {
    path: 'auth',
    // children: [authAmplify, authJwt, authFirebase, authAuth0, authSupabase],
    children: [authJwt,login,register],
  },
];

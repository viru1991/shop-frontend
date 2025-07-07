import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

const loginPaths = {
  jwt: paths.auth.login,
//   auth0: paths.auth.auth0.login,
//   amplify: paths.auth.amplify.login,
//   firebase: paths.auth.firebase.login,
//   supabase: paths.auth.supabase.login,
};

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const { loading } = useAuthContext();

  return <>{loading ? <SplashScreen /> : <Container> {children}</Container>}</>;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

// function Container({ children }) {
//   const router = useRouter();

//   const { authenticated, method } = useAuthContext();

//   const [checked, setChecked] = useState(false);
//   const check = useCallback(() => {
//     if (!authenticated) {
//       const searchParams = new URLSearchParams({
//         returnTo: window.location.pathname,
//       }).toString();

//       const loginPath = loginPaths[method];

//       const href = `${loginPath}?${searchParams}`;

//       router.replace(href);
//     } else {
//       setChecked(true);
//     }
//   }, [authenticated, method, router]);

//   useEffect(() => {
//     check();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   if (!checked) {
//     return null;
//   }

//   return <>{children}</>;
// }

// import { useLocation } from 'react-router-dom';

// function Container({ children }) {
//   const router = useRouter();
//   const { authenticated, method } = useAuthContext();
//   const { pathname } = useLocation();

//   const [checked, setChecked] = useState(false);

//   const check = useCallback(() => {
//     if (!authenticated) {
//       const isOnLoginPage = pathname.startsWith('/auth/login') ;
//       if (!isOnLoginPage) {
//         const searchParams = new URLSearchParams({
//           returnTo: pathname,
//         }).toString();

//         const loginPath = loginPaths[method];
//         const href = `${loginPath}?${searchParams}`;

//         router.replace(href);
//       }
//     } else {
//       setChecked(true);
//     }
//   }, [authenticated, method, pathname, router]);

//   useEffect(() => {
//     check();
//   }, [check]);

//   if (!checked) {
//     return null;
//   }

//   return <>{children}</>;
// }

// Container.propTypes = {
//   children: PropTypes.node,
// };

import { useLocation } from 'react-router-dom';

function Container({ children }) {
  const router = useRouter();
  const { authenticated, method, user } = useAuthContext();
  const { pathname } = useLocation();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    const isOnLoginPage = pathname.startsWith('/auth/login');
    const isAdminPage = pathname.startsWith('/dashboard');

    // 1️⃣ If NOT authenticated → redirect to login
    if (!authenticated) {
      if (!isOnLoginPage) {
        const searchParams = new URLSearchParams({
          returnTo: pathname,
        }).toString();

        const loginPath = loginPaths[method];
        const href = `${loginPath}?${searchParams}`;
        router.replace(href);
      }

      return; // block rendering
    }

    // 2️⃣ If authenticated but not admin → block admin pages
    // if (isAdminPage && user?.data?.role !== 'admin') {
    //   router.replace('/product'); // or wherever you want non-admins to go
    //   return;
    // }

    setChecked(true);
  }, [authenticated, method, pathname, router, user]);

  useEffect(() => {
    check();
  }, [check]);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}

Container.propTypes = {
  children: PropTypes.node,
};

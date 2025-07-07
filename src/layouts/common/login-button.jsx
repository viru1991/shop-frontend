// import PropTypes from 'prop-types';

// import Button from '@mui/material/Button';

// import { RouterLink } from 'src/routes/components';

// // import { PATH_AFTER_LOGIN } from 'src/config-global';

// // ----------------------------------------------------------------------

// export default function LoginButton({ sx }) {
//   return (
//     // <Button component={RouterLink} href={PATH_AFTER_LOGIN} variant="outlined" sx={{ mr: 1, ...sx }}>
//     <Button component={RouterLink} href={'/auth/login'} variant="outlined" sx={{ mr: 1, ...sx }}>
//     Login
//     </Button>
//   );
// }

// LoginButton.propTypes = {
//   sx: PropTypes.object,
// };

import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { useLocation } from 'react-router-dom';
import { RouterLink } from 'src/routes/components';

// export default function LoginButton({ sx }) {
//   const location = useLocation();
//   const returnTo = encodeURIComponent(location.pathname);
//   const loginHref = `/auth/login?returnTo=${returnTo}`;

//   return (
//     <Button
//       component={RouterLink}
//       href={loginHref}
//       variant="outlined"
//       sx={{ mr: 1, ...sx }}
//     >
//       Login
//     </Button>
//   );
// }

export default function LoginButton({ sx }) {
  const location = useLocation();
  const pathname = location.pathname;

  // 👉 If on `/` then no returnTo
  const loginHref =
    pathname === '/' ? '/auth/login' : `/auth/login?returnTo=${encodeURIComponent(pathname)}`;

  return (
    <Button
      component={RouterLink}
      href={loginHref}
      variant="outlined"
      sx={{ mr: 1, ...sx }}
    >
      Login
    </Button>
  );
}

LoginButton.propTypes = {
  sx: PropTypes.object,
};

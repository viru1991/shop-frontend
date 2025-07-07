import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
// import { useMockedUser } from 'src/hooks/use-mocked-user';

import { ForbiddenIllustration } from 'src/assets/illustrations';

import { varBounce, MotionContainer } from 'src/components/animate';
import { useAuthContext } from '../hooks';
// import { useNavigate } from 'react-router-dom';
import { RouterLink } from 'src/routes/components';
// ----------------------------------------------------------------------

export default function RoleBasedGuard({ hasContent, roles, children, sx }) {
  // Logic here to get current user role
  // const { user } = useMockedUser();
  const { user } = useAuthContext();
  // const currentRole = 'user';
  const currentRole = user.data.role; // admin;
  console.log(roles.includes(currentRole),currentRole,user,"sad")
  // const navigate = useNavigate();

  // const handleBack = () => {
  //   navigate('/auth/login'); // 👉 put your login path here
  // };
  if (typeof roles !== 'undefined' && !roles.includes(currentRole)) {
    return hasContent ? (
      <Container component={MotionContainer} sx={{ textAlign: 'center', ...sx }}>
        <m.div variants={varBounce().in}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            Permission Denied
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <Typography sx={{ color: 'text.secondary' }}>
            You do not have permission to access this page
          </Typography>
        </m.div>

        <m.div variants={varBounce().in}>
          <ForbiddenIllustration
            sx={{
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />
        </m.div>
        {/* <button onClick={handleBack}>Back</button> */}
        <Button component={RouterLink} href="/auth/login" size="large" variant="contained">
          Go to Home
        </Button>
      </Container>
    ) : null;
  }

  return <> {children} </>;
}

RoleBasedGuard.propTypes = {
  children: PropTypes.node,
  hasContent: PropTypes.bool,
  roles: PropTypes.arrayOf(PropTypes.string),
  sx: PropTypes.object,
};

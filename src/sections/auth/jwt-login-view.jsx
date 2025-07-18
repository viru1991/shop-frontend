import * as Yup from 'yup';
import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

// import { useAuthContext } from 'src/auth/hooks';
// import { PATH_AFTER_LOGIN } from 'src/config-global';

import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { executeACGAction,reset } from 'src/store/slice';
import { acgSelector } from 'src/store/selector';
import { createStructuredSelector } from 'reselect';
import { ACTION_CODES, STORE_KEYS } from 'src/constants/apiConstants';
import { useAuthContext } from 'src/context/hooks'; 
// ----------------------------------------------------------------------

export default function JwtLoginView() {
  const { login,user } = useAuthContext();
  const dispatch = useDispatch();
//   const acgStateSelector = createStructuredSelector({
//     acgSlice: acgSelector()
// });
// const { acgSlice: state } = useSelector(acgStateSelector);

  const router = useRouter();

  const [errorMsg, setErrorMsg] = useState('');

  const searchParams = useSearchParams();

  const returnTo = searchParams.get('returnTo');

  const password = useBoolean();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email must be a valid email address'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: 'demo@minimals.cc',
    password: 'demo1234',
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    // reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login?.(data.email, data.password);
      // router.push(returnTo || PATH_AFTER_LOGIN);
    //   const bundle = {
    //     payload: {
    //         urlPath: ACTION_CODES.LOGIN,
    //         requestType: 'POST',
    //         reqObj: {
    //             email: data?.email,
    //             password: data.password
    //         }
    //     },
    //     uniqueScreenIdentifier: { isLoggedIn: true },
    //     storeKey: STORE_KEYS.LOGIN_DATA
    // };
    // dispatch(executeACGAction(bundle));
    }
     catch (error) {
      console.error(error,"Sd");
      // reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  // useEffect(() => {
  //   if(state?.loginData?.isLoggedIn===true){
  //     if(state?.loginData?.data?.role == 'admin'){
  //       console.log('dsh')
  //       router.push(returnTo || '/dashboard')
  //     }else{
  //       router.push('/product')
  //     }
  //   }
  // }, [state?.loginData?.isLoggedIn]);

  useEffect(() => {
    console.log(returnTo,"Sad")
    if (user?.isLoggedIn) {
      const isProtected =
      returnTo?.startsWith('/dashboard')
      if (user?.data?.role === 'admin') {
        router.push(isProtected ? returnTo : '/dashboard');
      } 
      if(user?.data?.role === 'user'){
        router.push(isProtected ? '/product' : (returnTo || '/product'));
      }
    }
  }, [user]);

  const renderHead = (
    <Stack spacing={2} sx={{ mb: 5 }}>
      <Typography variant="h4">Sign in to Minimal</Typography>

      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">New user?</Typography>

        <Link component={RouterLink} href={paths.auth.register} variant="subtitle2">
          Create an account
        </Link>
      </Stack>
    </Stack>
  );

  const renderForm = (
    <Stack spacing={2.5}>
      <RHFTextField name="email" label="Email address" />

      <RHFTextField
        name="password"
        label="Password"
        type={password.value ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={password.onToggle} edge="end">
                <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Link variant="body2" color="inherit" underline="always" sx={{ alignSelf: 'flex-end' }}>
        Forgot password?
      </Link>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Login
      </LoadingButton>
    </Stack>
  );

  return (
    <>
      {renderHead}

      <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert>

      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        {renderForm}
      </FormProvider>
    </>
  );
}

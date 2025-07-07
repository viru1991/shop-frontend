import {useMemo} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { executeACGAction } from 'src/store/slice';
import { ACTION_CODES, STORE_KEYS } from 'src/constants/apiConstants';
import { AuthContext } from './auth-context';

export function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const loginData = useSelector(state => state.acgSlice?.loginData);

  const login = async (email, password) => {
    try{
        const bundle = {
            payload: {
              urlPath: ACTION_CODES.LOGIN,
              requestType: 'POST',
              reqObj: { email, password },
            },
            uniqueScreenIdentifier: { isLoggedIn: true },
            storeKey: STORE_KEYS.LOGIN_DATA,
          };
          dispatch(executeACGAction(bundle));
    }
    catch(err){
        return err
    }
  };

  const logout = () => {
    // You’ll need to clear the store key:
    dispatch({ type: 'RESET_STORE_KEY', payload: { storeKey: STORE_KEYS.LOGIN_DATA } });
  };

  const isLoggedIn = loginData?.isLoggedIn === true;

  const memoizedValue = useMemo(() => ({
    user: loginData,
    method: 'jwt',
    loading: false,
    authenticated: isLoggedIn,
    unauthenticated: !isLoggedIn,
    login,
    logout,
  }), [loginData, isLoggedIn]);

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './store';
import { AuthorizationStatus } from './types/auth';

type PrivateRouteProps = {
  children: JSX.Element;
};

function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useSelector(
    (state: RootState) => state.auth.authorizationStatus
  );

  const isAuthorized = authorizationStatus === AuthorizationStatus.Auth;

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default PrivateRoute;

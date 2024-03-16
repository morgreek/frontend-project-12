import { Navigate, Outlet } from 'react-router-dom';

import useAuthorizationContext from '../hooks/useAuthorizationContext.js';
import routes from '../routes.js';

const PrivateRoutes = () => {
  const { userData } = useAuthorizationContext();
  return (
    userData ? <Outlet /> : <Navigate to={routes.login} />
  );
};

export default PrivateRoutes;

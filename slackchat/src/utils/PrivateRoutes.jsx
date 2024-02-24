import { Navigate, Outlet } from 'react-router-dom';

import { useAuthorizationContext } from '../hooks/useAuthorizationContext.js';

const PrivateRoutes = () => {
  const { userData } = useAuthorizationContext();
  return (
    userData ? <Outlet /> : <Navigate to="/login" />
  );
};

export default PrivateRoutes;

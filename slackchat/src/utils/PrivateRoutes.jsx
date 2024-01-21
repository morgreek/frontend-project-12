import { Outlet, Navigate } from 'react-router-dom';
import { useAuthorizationContext } from '../hooks/useAuthorizationContext.js';

const PrivateRoutes = () => {
    const { isLogged } = useAuthorizationContext();
    return (
        isLogged ? <Outlet /> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;

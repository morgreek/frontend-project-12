import { useContext } from 'react';
import AuthorizationContext from '../AuthorizationContext';

export default function useAuth() {
    return useContext(AuthorizationContext);
}

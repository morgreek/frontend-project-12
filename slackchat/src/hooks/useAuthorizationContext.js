import { useContext } from 'react';

import { AuthorizationContext } from '../context/AuthorizationContext.js';

const useAuthorizationContext = () => useContext(AuthorizationContext);

export default useAuthorizationContext;

import { createContext, useMemo, useState } from 'react';

const AuthorizationContext = createContext({});

const AuthorizationContextProvider = ({ children }) => {
  const [userData, setLogin] = useState(() => {
    const userLocal = localStorage.getItem('user');
    return userLocal ? JSON.parse(userLocal) : null;
  });

  const authState = useMemo(() => ({ setLogin, userData }), [userData]);

  return (
    <AuthorizationContext.Provider value={authState}>
      { children }
    </AuthorizationContext.Provider>
  );
};

export { AuthorizationContext, AuthorizationContextProvider };

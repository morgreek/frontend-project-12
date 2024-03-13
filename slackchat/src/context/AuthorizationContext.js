import { createContext, useMemo, useState } from 'react';

const AuthorizationContext = createContext({});

const AuthorizationContextProvider = ({ children }) => {
  const [userData, setLogin] = useState(() => {
    const userLocal = localStorage.getItem('user');
    return userLocal ? JSON.parse(userLocal) : null;
  });

  const saveUserData = (data) => localStorage.setItem('user', JSON.stringify(data));

  const authState = useMemo(() => ({
    setLogin,
    userData,
    saveUserData,
  }), [userData]);

  return (
    <AuthorizationContext.Provider value={authState}>
      { children }
    </AuthorizationContext.Provider>
  );
};

export { AuthorizationContext, AuthorizationContextProvider };

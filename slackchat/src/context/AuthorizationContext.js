import { createContext, useState } from 'react';

const AuthorizationContext = createContext({});

const AuthorizationContextProvider = ({ children }) => {
  const [userData, setLogin] = useState(() => {
    const userLocal = localStorage.getItem('user');
    return userLocal ? JSON.parse(userLocal) : null;
  });

  return (
    <AuthorizationContext.Provider value={{ setLogin, userData }}>
      { children }
    </AuthorizationContext.Provider>
  );
};

export { AuthorizationContext, AuthorizationContextProvider };

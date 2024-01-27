import { createContext, useState } from 'react';

const AuthorizationContext = createContext({});

const AuthorizationContextProvider = ({ children }) => {
    const [isLogged, setLogin] = useState(() => !!localStorage.getItem('user'));

    return (
        <AuthorizationContext.Provider value={{isLogged, setLogin}}>
            { children }
        </AuthorizationContext.Provider>
    )
}

export { AuthorizationContext, AuthorizationContextProvider };

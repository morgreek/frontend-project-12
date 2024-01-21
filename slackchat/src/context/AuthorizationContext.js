import { createContext, useState } from 'react';

const AuthorizationContext = createContext({});

const AuthorizationContextProvider = ({ children }) => {
    const [isLogged, setLogin] = useState(false);

    return (
        <AuthorizationContext.Provider value={{isLogged, setLogin}}>
            { children }
        </AuthorizationContext.Provider>
    )
}

export { AuthorizationContext, AuthorizationContextProvider };

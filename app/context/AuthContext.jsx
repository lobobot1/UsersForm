'use client'

import { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({});
    const elLog = () => {
        console.log('El Log Mano');
    }


    return (
        <AuthContext.Provider 
            value={{
                auth,
                elLog
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export {AuthProvider};

export default AuthContext;
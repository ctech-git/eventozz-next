
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
    const router = useRouter();
    const [userToken, setUserToken] = useState(null);
    const [userName, setUserName] = useState(null);

    const checkUserToken = () => {
        console.log('ajslkdfj');
        if (!userToken) {
            const localStorageToken = localStorage.getItem("accessToken");
            if (localStorageToken) {
              setUserToken(localStorageToken);
            }
          }
    }

    const logout = () => {
        // console.log('there');
        localStorage.removeItem("accessToken");
        localStorage.removeItem("@eventozz::cartId");
        setUserToken(null);
        setUserName(null);
        router.push('/', '/');
    }

    return (
      <AuthContext.Provider value={{ userToken, setUserToken, userName, setUserName, checkUserToken, logout }}>
        {children}
      </AuthContext.Provider>
    );
  }
  
  export function useAuth() {
    const context = useContext(AuthContext);

    return context;
  }
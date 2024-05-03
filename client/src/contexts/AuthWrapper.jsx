import { createContext, useState } from "react";
import { axiosClient } from "../api/axios";

export const authContext = createContext({
    isFetchingUser: false,
    setIsFetchingUser: () => { },
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    user: {},
    setUser: () => { },
    getUser: () => { },
})

export function AuthWrapper({ children }) {
    const [isFetchingUser, setIsFetchingUser] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState({})
    

    const getUser = async () => {
        setIsFetchingUser(true);
        try {
            const response = await axiosClient.get('http://localhost:5555/get/user');
            const userData = response.data.user; 
            setUser(userData);
            setIsLoggedIn(true);
        } catch (err) {
            setIsLoggedIn(false);
            setUser({});
            localStorage.removeItem('token');
            console.error("Error from AuthWrapper:", err);
        }  finally {
            setIsFetchingUser(false);
        }
    };

    const logout = async () => {
        try {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setUser({});
        } catch (err) {
            console.error("error logging out: ", err);
        }
    };

    return <>
        <authContext.Provider value={{
            isFetchingUser, setIsFetchingUser,
            user, setUser,
            getUser,
            isLoggedIn , setIsLoggedIn,
            logout ,
        }}>
            {children}
        </authContext.Provider>
    </>
}
import { useContext, useState, useEffect, createContext } from "react";
import { getCurrentUser } from "../lib/appwrite";

const GlobalContext = createContext({ isLoggedIn: false, user: null, isLoading: true });

export const useGlobalContext = () => useContext(GlobalContext);

export default GlobalProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCurrentUser()
            .then((res) => {
                if (res) {
                    setIsLoggedIn(true);
                    setUser(res);
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn, setIsLoggedIn, user, setUser, isLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};